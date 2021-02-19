const { parse } = require('node-html-parser');
const OrganizationModel = require('../../db').Organization;
const MessagingUserModel = require('../../db').MessagingUser;
const ThreadModel = require('../../db').Thread;
const EmailModel = require('../../db').Email;
const ThreadService = require('../../services/thread');
const MessageService = require('../../services/message');

const formatInReplyTo = inReplyTo => {
    let newString = inReplyTo;
    if (newString.startsWith('<')) {
        newString = newString.substring(1);
    }
    if (newString.endsWith('>')) {
        newString = newString.slice(0, newString.length - 1);
    }

    const parts = newString.split('@');

    if (parts.length !== 2) {
        return newString;
    }

    return parts[0];
};

const getThread = async (email, organization, messagingUser) => {
    const inReplyToEmail = await EmailModel.findOne({
        where: {
            messageId: [email.inReplyTo, formatInReplyTo(email.inReplyTo)],
        },
        include: [{ model: ThreadModel }],
    });

    if (!inReplyToEmail) {
        return null;
    }

    if (
        inReplyToEmail.threads.length === 0 ||
        inReplyToEmail.threads[0].organizationId !== organization.id ||
        inReplyToEmail.threads[0].messagingUserId !== messagingUser.id
    ) {
        return null;
    }

    return inReplyToEmail.threads[0];
};

module.exports = async (imap, email) => {
    if (
        !email.to ||
        !email.to.value ||
        email.to.value.length === 0 ||
        !email.to.value[0].address
    ) {
        return;
    }

    const root = parse(email.textAsHtml);

    const nodes = [];
    let old = false;

    root.childNodes.forEach(node => {
        if (
            old ||
            node.structuredText.startsWith('>') ||
            node.structuredText.endsWith('wrote:')
        ) {
            old = true;
            return;
        }
        nodes.push(node.structuredText);
    });

    const message = nodes.join('\n');
    const fromName = email.from.value[0].name;
    const fromEmail = email.from.value[0].address;
    const toEmail = email.to.value[0].address;
    let subject = email.subject;
    subject =
        subject && subject.startsWith('Re: ')
            ? subject.substr('Re: '.length)
            : subject;

    const toEmailParts = toEmail.split('@');
    if (
        toEmailParts.length !== 2 ||
        toEmailParts[1] !== 'customer.mail.slugin.io'
    ) {
        return;
    }
    const organizationKey = toEmailParts[0];

    const organization = await OrganizationModel.findOne({
        where: {
            organizationKey,
        },
    });

    if (!organization) {
        return;
    }

    let messagingUser = await MessagingUserModel.findOne({
        where: {
            email: fromEmail,
            organizationId: organization.id,
        },
    });

    if (!messagingUser) {
        messagingUser = await MessagingUserModel.create({
            email: fromEmail,
            organizationId: organization.id,
        });
    }

    const dbEmail = await EmailModel.create({
        outgoing: false,
        messageId: email.messageId,
        fromEmail: fromEmail,
        fromName: fromName && fromName.length !== 0 ? fromName : null,
        toEmail,
        original: email.raw,
    });

    let thread = null;

    if (email.inReplyTo) {
        thread = await getThread(email, organization, messagingUser);
    }

    if (!thread) {
        await ThreadService.create(
            {
                organizationId: organization.id,
                messagingUserId: messagingUser.id,
            },
            {
                message,
                linkedEmailId: dbEmail.id,
            }
        );
    } else {
        await MessageService.create({
            threadId: thread.id,
            message,
            isFromClient: true,
            linkedEmailId: dbEmail.id,
        });
    }
};
