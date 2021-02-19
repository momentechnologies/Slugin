const ThreadModel = require('../../../db').Thread;
const MessageModel = require('../../../db').Message;
const NotFoundException = require('../../../exceptions/notFound');
const UnauthorizedException = require('../../../exceptions/unauthorized');
const MessageService = require('../../../services/message');
const MessagingUserAuth = require('../../../middlewares/MessagingUserAuth');
const GraphqlPubSub = require('../graphqlPubSub');
const { withFilter } = require('graphql-subscriptions');
const sequelize = require('../../../db').sequelize;

const newMessageTopic = require('./subscriptions').newMessageTopic;

module.exports.schema = `
  type Query {
    messages(
        threadId: Int!
    ): [Message]
    messagingUserMessages(
        threadId: Int!,
        messagingUserToken: String!
    ): [Message]
  }
  
  type Mutation {
    newMessage(threadId: Int!, message: String!): Message!
    newMessagingUserMessage(messagingUserToken: String!, threadId: Int!, message: String!): Message!
    messagingUserMessageSeen(messagingUserToken: String!, threadId: Int!, messageId: Int!): [Message]!
  }
  
  type Subscription {
    newMessage(
        threadId: Int,
        messagingUserToken: String
    ): Message
  }
  
  type Message {
    id: Int
    threadId: Int
    isFromClient: Boolean
    clientSeen: Boolean
    message: String
    date: DateTime
  }
`;

module.exports.resolvers = {
    Query: {
        messages: async (root, { threadId }) => {
            return await MessageModel.findAll({
                where: {
                    threadId,
                },
                order: [['date', 'asc']],
            });
        },
        messagingUserMessages: MessagingUserAuth(
            async (root, { threadId, messagingUser }) => {
                const thread = await ThreadModel.findOne({
                    where: {
                        id: threadId,
                    },
                });

                if (!thread) {
                    throw new NotFoundException('thread');
                }

                if (thread.messagingUserId !== messagingUser.id) {
                    throw new UnauthorizedException(
                        'You do not have access to this thread',
                        UnauthorizedException.uids.NO_ACCESS
                    );
                }

                return await MessageModel.findAll({
                    where: {
                        threadId,
                    },
                    order: [['date', 'asc']],
                });
            }
        ),
    },
    Mutation: {
        newMessage: async (root, { threadId, message }) => {
            return await MessageService.create({
                threadId,
                message,
                isFromClient: false,
            });
        },
        newMessagingUserMessage: MessagingUserAuth(
            async (root, { messagingUser, threadId, message }) => {
                const thread = await ThreadModel.findOne({
                    where: {
                        id: threadId,
                    },
                });

                if (!thread || thread.messagingUserId !== messagingUser.id) {
                    throw new UnauthorizedException(
                        'You do not have access to this thread',
                        UnauthorizedException.uids.NO_ACCESS
                    );
                }

                return await MessageService.create({
                    threadId,
                    message,
                    isFromClient: true,
                });
            }
        ),
        messagingUserMessageSeen: MessagingUserAuth(
            async (parent, { messagingUser, threadId, messageId }) => {
                let thread = await ThreadModel.findOne({
                    where: {
                        id: threadId,
                        messagingUserId: messagingUser.id,
                    },
                });

                if (!thread) {
                    return [];
                }

                const r = await MessageModel.update(
                    {
                        clientSeen: true,
                    },
                    {
                        where: {
                            threadId: thread.id,
                            clientSeen: false,
                            id: {
                                [sequelize.Op.lte]: messageId,
                            },
                        },
                        returning: true,
                    }
                );

                return r[1];
            }
        ),
    },
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                () => GraphqlPubSub.asyncIterator(newMessageTopic.key),
                newMessageTopic.newMessageFilter
            ),
        },
    },
};
