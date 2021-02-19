const uuid = require('uuid');
const url = require('url');
const OrganizationRepository = require('../../../repositories/organization');
const OrganizationService = require('../../../services/organization');
const OrganizationModel = require('../../../db').Organization;
const OrganizationInitialMessageModel = require('../../../db')
    .OrganizationInitialMessage;
const OrganizationUserModel = require('../../../db').OrganizationUser;
const ThreadModel = require('../../../db').Thread;
const OrganizationDomainModel = require('../../../db').OrganizationDomain;

module.exports.schema = `
  type Query {
    organizationSettings(organizationId: Int!): [OrganizationSetting]
    organization(organizationId: Int!): Organization
    messagingOrganization(key: String!): MessagingOrganization
    organizationUser(organizationId: Int!, userId: Int!): OrganizationUser
  }
  
  type Mutation {
    updateOrganizationSetting(organizationId: Int!, name: String!, value: String!): OrganizationSetting
    addNewOrganizationCard(organizationId: Int!, token: String!): NewOrganizationCardResponse
    createOrganization(name: String!): Organization
    updateInitialMessages(organizationId: Int!, messages: [String]!): [OrganizationInitialMessage]
  }
  
  type NewOrganizationCardResponse {
    error: ResponseError
    card: OrganizationCard
  }
  
  type Organization {
    id: Int
    name: String
    stripeId: String
    organizationKey: String
    hasAnyThread: Boolean
    users: [OrganizationUser]
    settings: [OrganizationSetting]
    botReplies: [BotReply]
    cards: [OrganizationCard]
    initialMessages: [OrganizationInitialMessage]
  }
  
  type MessagingOrganization {
    name: String
    organizationKey: String
    settings: [OrganizationSetting]
    initialMessages: [OrganizationInitialMessage]
  }
  
  type OrganizationInitialMessage {
    id: Int
    message: String
  }
  
  type OrganizationCard {
    stripeId: String
    organizationId: Int
    last4: Int
    expiresMonth: Int
    expiresYear: Int
    primary: Int
  }
            
  type OrganizationUser {
    role: String
    user: User
    notifications: [OrganizationUserNotification]
  }
  
  type OrganizationSetting {
    organizationId: Int
    name: String
    value: String
  }
`;

module.exports.resolvers = {
    Query: {
        organizationSettings: async (parent, { organizationId }) => {
            const organization = await OrganizationRepository.findById(
                organizationId
            );

            return organization.settings;
        },
        organization: async (parent, { organizationId }) => {
            return await OrganizationRepository.findById(organizationId);
        },
        messagingOrganization: async (parent, { key }, { req }) => {
            const organization = await OrganizationRepository.findOrganizationFromKey(
                key
            );

            if (!organization) {
                return null;
            }

            const originUrl = url.parse(req.get('origin'));

            const existingDomain = await OrganizationDomainModel.findOne({
                where: {
                    organizationId: organization.id,
                    domain: originUrl.hostname,
                },
            });

            if (!existingDomain) {
                await OrganizationDomainModel.create({
                    organizationId: organization.id,
                    domain: originUrl.hostname,
                });
            }

            return organization;
        },
        organizationUser: async (parent, { organizationId, userId }) => {
            return await OrganizationUserModel.findOne({
                where: {
                    userId,
                    organizationId,
                },
            });
        },
    },
    Mutation: {
        updateOrganizationSetting: async (
            parent,
            { organizationId, name, value }
        ) => {
            return await OrganizationService.updateSettings(
                organizationId,
                name,
                value
            );
        },
        addNewOrganizationCard: async (parent, { organizationId, token }) => {
            return await OrganizationService.addCard(organizationId, token);
        },
        createOrganization: async (parent, { name }, { user }) => {
            const organization = await OrganizationModel.create({
                name,
                organizationKey: uuid.v4(),
            });
            await OrganizationUserModel.create({
                organizationId: organization.id,
                userId: user.id,
                role: 'admin',
            });
            return organization;
        },
        updateInitialMessages: async (parent, { organizationId, messages }) => {
            const oldMessages = await OrganizationInitialMessageModel.findAll({
                where: {
                    organizationId: organizationId,
                },
            });

            const toCreate = messages.filter(
                message =>
                    !oldMessages.find(
                        oldMessage => oldMessage.message === message
                    )
            );

            const toDelete = oldMessages.filter(
                oldMessage =>
                    !messages.find(message => message === oldMessage.message)
            );

            await Promise.all(
                toCreate.map(message =>
                    OrganizationInitialMessageModel.create({
                        organizationId,
                        message,
                    })
                )
            );

            await Promise.all(toDelete.map(oldMessage => oldMessage.destroy()));

            return await OrganizationInitialMessageModel.findAll({
                where: {
                    organizationId,
                },
            });
        },
    },
    Organization: {
        users: async parent => {
            const organization = await OrganizationRepository.findById(
                parent.id
            );

            return organization.users.map(user => ({
                role: user.organizationUser.role,
                user: user.dataValues,
            }));
        },
        settings: async parent => {
            if (parent.settings) {
                return parent.settings;
            }

            const organization = await OrganizationRepository.findById(
                parent.id
            );

            return organization.settings;
        },
        cards: async parent => {
            return await OrganizationService.getOrganizationCards(parent.id);
        },
        hasAnyThread: async parent => {
            const threads = await ThreadModel.findAll({
                where: {
                    organizationId: parent.id,
                },
            });

            return threads.length !== 0;
        },
        initialMessages: async parent => {
            return await OrganizationInitialMessageModel.findAll({
                where: {
                    organizationId: parent.id,
                },
            });
        },
    },
    MessagingOrganization: {
        initialMessages: async parent => {
            return await OrganizationInitialMessageModel.findAll({
                where: {
                    organizationId: parent.id,
                },
            });
        },
    },
};
