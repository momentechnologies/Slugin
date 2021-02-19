const BotReplyModel = require('../db').BotReply;
const MessageModel = require('../db').Message;
const sequelize = require('../db').sequelize;
const ThreadRepository = require('../repositories/thread');
const MessageRepository = require('../repositories/message');
const NotFoundException = require('../exceptions/notFound');
const PubSub = require('../utils/pubsub');

const create = async message => {
    const thread = await ThreadRepository.findById(message.threadId);

    if (!thread) {
        throw new NotFoundException('thread');
    }

    const createdMessage = await MessageRepository.create({
        ...message,
        date: new Date(),
        clientSeen: message.isFromClient,
        clientNotified: false,
    });

    PubSub.publish('message', {
        ...createdMessage.toJSON(),
        organizationId: thread.organizationId,
    });

    if (message.isFromClient) {
        await MessageModel.update(
            { clientSeen: true },
            {
                where: {
                    threadId: message.threadId,
                    clientSeen: false,
                    id: {
                        [sequelize.Op.lt]: createdMessage.id,
                    },
                },
            }
        );
    }

    return createdMessage;
};
module.exports.create = create;

module.exports.createBotMessage = async (botReplyId, messageId, threadId) => {
    const BotReply = await BotReplyModel.findByPk(botReplyId);

    if (!BotReply) {
        return;
    }

    await create({
        threadId,
        message: BotReply.replyText,
        isFromClient: false,
        date: new Date(),
    });
};
