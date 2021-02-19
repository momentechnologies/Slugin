const ThreadModel = require('../../db').Thread;
const UserModel = require('../../db').User;
const OrganizationUserNotificationSettingModel = require('../../db')
    .OrganizationUserNotificationSetting;
const MessagingUserModel = require('../../db').MessagingUser;
const MessageModel = require('../../db').Message;
const EmailUtils = require('../../utils/email');

module.exports = async message => {
    const threadMessage = JSON.parse(message.data.toString());

    if (!threadMessage.isFromClient) {
        return;
    }

    const thread = await ThreadModel.findByPk(threadMessage.threadId);

    if (!thread) {
        return;
    }

    const messagingUser = await MessagingUserModel.findByPk(
        thread.messagingUserId
    );

    if (!messagingUser) {
        return;
    }

    const notificationSettings = await OrganizationUserNotificationSettingModel.findAll(
        {
            where: {
                organizationId: threadMessage.organizationId,
                canSend: true,
                notificationType: 'email',
            },
        }
    );

    const userIdsToSendTo = notificationSettings
        .filter(
            ns =>
                ns.notificationName === 'new_conversations' ||
                (ns.notificationName === 'assigned_to_me' &&
                    ns.userId === thread.assignedUserId)
        )
        .map(ns => ns.userId);

    const users = await UserModel.findAll({
        where: {
            id: userIdsToSendTo,
        },
    });

    const emails = users.map(u => u.email);

    const messageCount = await MessageModel.count({
        where: {
            threadId: thread.id,
        },
    });

    if (messageCount === 1) {
        await EmailUtils.sendNewThreadNotification(
            emails,
            `/app/${threadMessage.organizationId}/conversations/${thread.id}`,
            threadMessage.message,
            messagingUser.name
        );
    } else {
        await EmailUtils.sendNewThreadMessageNotification(
            emails,
            `/app/${threadMessage.organizationId}/conversations/${thread.id}`,
            threadMessage.message,
            messagingUser.name
        );
    }
};
