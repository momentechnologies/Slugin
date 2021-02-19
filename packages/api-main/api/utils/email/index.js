const fs = require('fs-extra');
const Mustache = require('mustache');
const sendgrid = require('./sendgrid');
const EmailModel = require('../../db').Email;
const appConfig = require('../../config/app');

const makeid = length => {
    let result = '';
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

const sendOne = async (subject, text, template, data, to, replyTo) => {
    const html = await getHtml(template, {
        ...data,
        url: appConfig.url,
    });

    if (process.env.NODE_ENV === 'production') {
        const response = await sendgrid.send({
            to,
            from: 'support@slugin.io',
            subject,
            text,
            html,
            replyTo,
        });

        return await EmailModel.create({
            outgoing: true,
            fromEmail: 'support@slugin.io',
            toEmail: to,
            messageId: response[0].toJSON().headers['x-message-id'],
            original: html,
        });
    }

    const fileName = `[${Date.now()}]${template}.html`;

    await fs.ensureDir(process.cwd() + '/emails');
    await fs.writeFile(process.cwd() + '/emails/' + fileName, html);

    return await EmailModel.create({
        outgoing: true,
        fromEmail: 'support@slugin.io',
        toEmail: to,
        messageId: makeid(10),
        original: html,
    });
};

const send = async (subject, text, template, data, to, replyTo) => {
    const toEmails = typeof to === 'string' ? [to] : to;
    const emails = [];

    for (let x = 0; x < toEmails.length; x++) {
        const email = await sendOne(
            subject,
            text,
            template,
            data,
            toEmails[x],
            replyTo
        );
        emails.push(email);
    }

    return emails;
};

const getHtml = async (template, data) => {
    const content = await fs.readFile(
        `${__dirname}/templates/${template}.html`
    );

    return Mustache.render(content.toString(), data);
};

module.exports.sendConfirmationEmail = async (email, token) => {
    await send(
        `Welcome to Slugin! Please confirm your email`,
        `Welcome to Slugin! Please confirm your email`,
        'confirmEmail',
        {
            token,
        },
        email
    );
};

module.exports.sendNewThreadNotification = async (
    emails,
    threadPath,
    message,
    name
) => {
    return await send(
        `[Slugin] New conversation`,
        `Hi, A client just started a new conversation with you.`,
        'newThread',
        {
            threadPath,
            message,
            name,
        },
        emails
    );
};

module.exports.sendNewThreadMessageNotification = async (
    emails,
    threadPath,
    message,
    name
) => {
    return await send(
        `[Slugin] New message from ${name}`,
        `Hi, A client just sent a new message.`,
        'newClientThreadMessage',
        {
            threadPath,
            message,
            name,
        },
        emails
    );
};

module.exports.sendNewMessageNotification = async (
    email,
    replyTo,
    organizationName,
    message,
    threadId
) => {
    return await send(
        `[${organizationName} - ${threadId}] New message`,
        `Hi, ${organizationName} just sent a new message.`,
        'newMessage',
        {
            organizationName,
            message,
        },
        email,
        replyTo
    );
};
