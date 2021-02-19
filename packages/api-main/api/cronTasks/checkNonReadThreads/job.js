const moment = require('moment');
const ThreadModel = require('../../db').Thread;
const MessageModel = require('../../db').Message;
const OrganizationModel = require('../../db').Organization;
const MessagingUserModel = require('../../db').MessagingUser;
const ThreadEmailModel = require('../../db').ThreadEmail;
const sequelize = require('../../db').sequelize;
const email = require('../../utils/email');
const OrganizationService = require('../../services/organization');

const process = async (threadId, messages) => {
    await notify(threadId, messages);

    await MessageModel.update(
        {
            clientSeen: true,
            clientNotified: true,
        },
        {
            where: {
                id: messages.map(m => m.id),
            },
        }
    );
};

const notify = async (threadId, messages) => {
    const thread = await ThreadModel.findByPk(threadId);

    if (!thread) {
        return;
    }

    const organization = await OrganizationModel.findByPk(
        thread.organizationId
    );
    const messagingUser = await MessagingUserModel.findByPk(
        thread.messagingUserId
    );

    if (!organization || !messagingUser || !messagingUser.email) {
        return;
    }

    const organziationEmail = OrganizationService.getOrganizationEmail(
        organization
    );

    const emails = await email.sendNewMessageNotification(
        messagingUser.email,
        organziationEmail,
        organization.name,
        messages[0].message,
        thread.id
    );

    await ThreadEmailModel.create({
        emailId: emails[0].id,
        threadId: thread.id,
    });
};

module.exports = async () => {
    const messages = await MessageModel.findAll({
        where: {
            clientSeen: false,
            clientNotified: false,
            date: {
                [sequelize.Op.lt]: moment()
                    .subtract(1, 'minutes')
                    .toDate(),
            },
        },
        order: [['date', 'desc']],
    });

    const threads = messages.reduce((threads, message) => {
        if (!threads[message.threadId]) {
            threads[message.threadId] = [];
        }

        threads[message.threadId].push(message);
        return threads;
    }, {});

    await Promise.all(
        Object.keys(threads).map(threadId =>
            process(threadId, threads[threadId])
        )
    );
};
