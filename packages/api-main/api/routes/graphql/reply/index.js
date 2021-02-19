const yup = require('yup');

const Authorization = require('../../../middlewares/authorization');
const PubSub = require('../../../utils/pubsub');
const DateUtils = require('../../../utils/date');

const BotReplyModel = require('../../../db').BotReply;
const BotReplyTriggerModel = require('../../../db').BotReplyTrigger;

module.exports.schema = `
  type Mutation {
    addOrUpdateBotReply(
        id: Int
        organizationId: Int!
        title: String!
        reply: String!
        triggers: [String]!
    ): BotReply
  }
  
  type BotReply {
    id: Int
    organizationId: Int
    title: String
    replyText: String
    createdAt: Int
    updatedAt: Int
    triggers: [BotReplyTriggers]
  }
  
  type BotReplyTriggers {
    id: Int
    sentence: String
  }
`;

module.exports.resolvers = {
    Mutation: {
        addOrUpdateBotReply: {
            validationSchema: yup.object().shape({
                id: yup.number().min(1, 'Id must be a valid id'),
                title: yup
                    .string()
                    .trim()
                    .required()
                    .min(2, 'Title is too short'),
                reply: yup
                    .string()
                    .trim()
                    .required()
                    .min(2, 'Reply is too short'),
                triggers: yup
                    .array()
                    .of(yup.string())
                    .required()
                    .min(1, 'You must add at least one trigger'),
            }),
            resolve: Authorization((root, { organizationId }) => ({
                organizationId,
            }))(
                async (
                    root,
                    { id, organizationId, title, reply, triggers }
                ) => {
                    let response = {};
                    if (id) {
                        const botReply = await BotReplyModel.findOne({
                            where: {
                                id,
                                organizationId,
                            },
                        });

                        await botReply.update({
                            replyText: reply,
                            title,
                        });

                        const botReplyTriggers = await BotReplyTriggerModel.findAll(
                            {
                                where: { botReplyId: id },
                            }
                        );

                        const toDelete = botReplyTriggers
                            .filter(
                                brt => !triggers.some(t => t === brt.sentence)
                            )
                            .map(brt => brt.id);

                        const toCreate = triggers.filter(
                            t =>
                                !botReplyTriggers.find(
                                    brt => brt.sentence === t
                                )
                        );

                        await Promise.all(
                            toCreate.map(trigger =>
                                BotReplyTriggerModel.create({
                                    botReplyId: botReply.id,
                                    sentence: trigger,
                                })
                            )
                        );

                        await BotReplyTriggerModel.destroy({
                            where: {
                                id: toDelete,
                            },
                        });

                        response = {
                            ...botReply.dataValues,
                            triggers: await BotReplyTriggerModel.findAll({
                                botReplyId: id,
                            }),
                        };
                    } else {
                        const botReply = await BotReplyModel.create({
                            organizationId,
                            replyText: reply,
                            title,
                        });

                        const dbTriggers = await Promise.all(
                            triggers.map(trigger =>
                                BotReplyTriggerModel.create({
                                    botReplyId: botReply.id,
                                    sentence: trigger,
                                })
                            )
                        );

                        response = {
                            ...botReply.dataValues,
                            triggers: dbTriggers,
                        };
                    }

                    PubSub.publish('train_model', {
                        organizationId,
                    });

                    return response;
                }
            ),
        },
    },
    BotReply: {
        createdAt: parent => DateUtils.toUnix(parent.createdAt),
        updatedAt: parent => DateUtils.toUnix(parent.updatedAt),
        triggers: async parent => {
            return BotReplyTriggerModel.findAll({
                where: {
                    botReplyId: parent.id,
                },
            });
        },
    },
    Organization: {
        botReplies: async parent => {
            return BotReplyModel.findAll({
                where: {
                    organizationId: parent.id,
                },
            });
        },
    },
};
