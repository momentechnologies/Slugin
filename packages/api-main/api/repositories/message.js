const Message = require('../db').Message;
const Thread = require('../db').Thread;
const NotFoundException = require('../exceptions/notFound');

module.exports.findThreadMessages = async threadId => {
    const thread = await Thread.findOne({
        include: [
            {
                model: Message,
            },
        ],
        where: {
            id: threadId,
        },
    });

    if (!thread) {
        throw new NotFoundException('thread');
    }

    return thread.messages;
};

module.exports.create = async message => {
    return await Message.create(message);
};
