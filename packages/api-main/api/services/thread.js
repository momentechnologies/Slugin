const Sequelize = require('sequelize');
const ThreadModel = require('../db').Thread;
const ThreadRepository = require('../repositories/thread');
const MessageService = require('../services/message');
const OrganizationService = require('./organization');
const NotFoundException = require('../exceptions/notFound');
const PubSub = require('../utils/pubsub');

module.exports.getOrganizationThreads = async (organizationId, filters) => {
    return await ThreadRepository.findOrganizationThreads(organizationId, {
        endedAt:
            filters.status === 'open'
                ? null
                : {
                      [Sequelize.Op.ne]: null,
                  },
    });
};

module.exports.create = async (
    { organizationId, messagingUserId, firstMessage },
    messageData
) => {
    if (!organizationId || !messagingUserId || !firstMessage || !messageData) {
        throw new Error('ThreadService.create is missing arguments');
    }

    let thread = await ThreadModel.create({
        organizationId,
        messagingUserId,
        endedAt: null,
    });

    const message = await MessageService.create({
        threadId: thread.id,
        isFromClient: true,
        ...messageData,
    });

    PubSub.publish('new_thread', {
        ...thread.toJSON(),
    });

    return thread;
};

module.exports.close = async threadId => {
    let thread = await ThreadRepository.findById(threadId);

    if (!thread) {
        throw new NotFoundException('thread');
    }

    thread = await ThreadRepository.update(threadId, {
        ...thread.toJSON(),
        endedAt: Math.round(Date.now() / 1000),
    });

    PubSub.publish('thread_closed', thread);

    return thread;
};

module.exports.assign = async (threadId, userId) => {
    let thread = await ThreadRepository.findById(threadId);

    if (!thread) {
        throw new NotFoundException('thread');
    }

    if (userId !== null) {
        const isUserInOrganization = await OrganizationService.isUserInOrganization(
            userId,
            thread.organizationId
        );

        if (!isUserInOrganization) {
            throw new Exceptions.ValidationFailed();
        }
    }

    thread = await ThreadRepository.update(threadId, {
        ...thread.toJSON(),
        assignedUserId: userId,
    });

    return thread;
};
