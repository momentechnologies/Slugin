const Thread = require('../db').Thread;
const MessagingUser = require('../db').MessagingUser;
const NotFoundException = require('../exceptions/notFound');

const findById = async id => {
    return await Thread.findOne({
        where: {
            id,
        },
        include: [
            {
                model: MessagingUser,
            },
        ],
    });
};

module.exports.findById = findById;

module.exports.findOrganizationThreads = async (organizationId, where = {}) => {
    return await Thread.findAll({
        where: {
            organizationId,
            ...where,
        },
        include: [
            {
                model: MessagingUser,
            },
        ],
    });
};

module.exports.findMessagingClientThreads = async (
    organizationId,
    messagingUserId
) => {
    return await Thread.findAll({
        where: {
            organizationId,
            messagingUserId,
        },
        include: [
            {
                model: MessagingUser,
            },
        ],
    });
};

module.exports.create = async thread => {
    const newThread = await Thread.create(thread);

    return findById(newThread.id);
};

module.exports.update = async (threadId, thread) => {
    const oldThread = await findById(threadId);

    if (!oldThread) {
        throw new NotFoundException('thread');
    }

    await oldThread.update(thread);

    return oldThread;
};
