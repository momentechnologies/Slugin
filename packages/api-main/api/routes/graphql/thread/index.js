const Sequelize = require('sequelize');
const ThreadModel = require('../../../db').Thread;
const MessagingUserModel = require('../../../db').MessagingUser;
const MessageModel = require('../../../db').Message;
const NotFoundException = require('../../../exceptions/notFound');
const ValidationException = require('../../../exceptions/validation');
const OrganizationService = require('../../../services/organization');
const MessageService = require('../../../services/message');
const PubSub = require('../../../utils/pubsub');
const DateUtils = require('../../../utils/date');
const Authorization = require('../../../middlewares/authorization');
const MessagingUserAuth = require('../../../middlewares/MessagingUserAuth');
const GraphqlPubSub = require('../graphqlPubSub');
const { withFilter } = require('graphql-subscriptions');

const newThreadTopic = require('./subscriptions').newThreadTopic;

module.exports.schema = `
  type Query {
    thread(
        id: Int!
    ): Thread
    threads(
        organizationId: Int!
        filters: GetThreadsFilters!
    ): [Thread]
    messagingUserThreads(
        messagingUserToken: String!
    ): [MessagingUserThread]
  }
  
  type Mutation {
    assignThread(threadId: Int!, userId: Int): Thread!
    closeThread(threadId: Int!): Thread!
    newMessagingUserThread(messagingUserToken: String!, message: String!): MessagingUserThread!
  }
  
  type Subscription {
    newThread(
        organizationId: Int!
    ): Thread
  }
  
  input GetThreadsFilters {
    ongoing: Boolean!
    new: Boolean!
    done: Boolean!
  }
  
  type Subscription {
    newThread(
        organizationId: Int!
    ): Thread
  }
  
  type Thread {
    id: Int
    organizationId: Int
    messagingUserId: Int
    assignedUserId: Int
    endedAt: Int
    createdAt: Int
    updatedAt: Int
    lastMessage: Message
    messagingUser: MessagingUser
    clientLastSeen: DateTime
  }
  
  type MessagingUserThread {
    id: Int
    organizationId: Int
    messagingUserId: Int
    endedAt: Int
    createdAt: Int
    updatedAt: Int
    lastMessage: Message
    clientLastSeen: DateTime
  }
  
  type MessagingUser {
    id: Int
    organizationId: Int
    email: String
    name: String
    uid: String
    lastSeen: Int
  }
`;

module.exports.resolvers = {
    Query: {
        thread: Authorization((root, { id }) => ({
            threadId: id,
        }))(async (root, { id }) => {
            const thread = await ThreadModel.findByPk(id);

            if (!thread) {
                throw new NotFoundException('thread');
            }

            return thread.dataValues;
        }),
        threads: Authorization((root, { organizationId }) => ({
            organizationId,
        }))(async (root, { organizationId, filters }) => {
            let where = {};

            if (filters.new) {
                where = {
                    assignedUserId: null,
                    endedAt: null,
                };
            } else if (filters.done) {
                where = {
                    endedAt: {
                        [Sequelize.Op.ne]: null,
                    },
                };
            } else {
                where = {
                    endedAt: null,
                };
            }

            return await ThreadModel.findAll({
                where: {
                    organizationId,
                    ...where,
                },
            });
        }),
        messagingUserThreads: MessagingUserAuth(
            async (root, { messagingUser }) => {
                return await ThreadModel.findAll({
                    where: {
                        organizationId: messagingUser.organizationId,
                        messagingUserId: messagingUser.id,
                    },
                });
            }
        ),
    },
    Mutation: {
        assignThread: Authorization((root, { threadId }) => ({
            threadId,
        }))(async (parent, { threadId, userId }) => {
            const thread = await ThreadModel.findByPk(threadId);

            if (!thread) {
                throw new NotFoundException('thread');
            }

            if (userId !== null) {
                const isUserInOrganization = await OrganizationService.isUserInOrganization(
                    userId,
                    thread.organizationId
                );

                if (!isUserInOrganization) {
                    throw new ValidationException();
                }
            }

            await thread.update({
                assignedUserId: userId,
            });

            return thread;
        }),
        closeThread: Authorization((root, { threadId }) => ({
            threadId,
        }))(async (parent, { threadId }) => {
            let thread = await ThreadModel.findByPk(threadId);

            if (!thread) {
                throw new NotFoundException('thread');
            }

            await thread.update({
                endedAt: new Date(),
            });

            PubSub.publish('thread_closed', thread);

            return thread;
        }),
        newMessagingUserThread: MessagingUserAuth(
            async (parent, { messagingUser, message: messageString }) => {
                let thread = await ThreadModel.create({
                    organizationId: messagingUser.organizationId,
                    messagingUserId: messagingUser.id,
                    endedAt: null,
                });

                const message = await MessageService.create({
                    threadId: thread.id,
                    message: messageString,
                    isFromClient: true,
                });

                PubSub.publish('new_thread', {
                    ...thread.toJSON(),
                });

                return thread;
            }
        ),
    },
    Subscription: {
        newThread: {
            subscribe: withFilter(
                () => GraphqlPubSub.asyncIterator(newThreadTopic.key),
                (payload, { organizationId }) => {
                    return (
                        payload &&
                        payload.newThread.organizationId === organizationId
                    );
                }
            ),
        },
    },
    Thread: {
        createdAt: parent => DateUtils.toUnix(parent.createdAt),
        updatedAt: parent => DateUtils.toUnix(parent.updatedAt),
        endedAt: parent => DateUtils.toUnix(parent.endedAt),
        messagingUser: async parent => {
            return await MessagingUserModel.findByPk(parent.messagingUserId);
        },
        lastMessage: async parent => {
            return await MessageModel.findOne({
                where: {
                    threadId: parent.id,
                },
                order: [['id', 'desc']],
            });
        },
    },
    MessagingUserThread: {
        createdAt: parent => DateUtils.toUnix(parent.createdAt),
        updatedAt: parent => DateUtils.toUnix(parent.updatedAt),
        endedAt: parent => DateUtils.toUnix(parent.endedAt),
        lastMessage: async parent => {
            return await MessageModel.findOne({
                where: {
                    threadId: parent.id,
                },
                order: [['date', 'desc']],
            });
        },
    },
};
