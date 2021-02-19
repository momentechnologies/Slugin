const yup = require('yup');
const OrganizationRepository = require('../../../repositories/organization');
const MessagingUserRepository = require('../../../repositories/messagingUser');
const TokenUtils = require('../../../utils/token');
const DateUtils = require('../../../utils/date');
const nameGenerator = require('../../../utils/nameGenerator');
const NotFoundException = require('../../../exceptions/notFound');

module.exports.schema = `
  type Mutation {
    createMessagingUserToken(messagingUserInfo: MessagingUserInfo!): String
  }
  
  input MessagingUserInfo {
    organizationKey: String
    uid: String
    email: String
    name: String
    oldToken: String
  }
`;

module.exports.resolvers = {
    Mutation: {
        createMessagingUserToken: {
            validationSchema: yup.object().shape({
                messagingUserInfo: yup.object().shape({
                    email: yup
                        .string()
                        .trim()
                        .email('Must be a valid email')
                        .required('Email is required'),
                    name: yup
                        .string()
                        .trim()
                        .min(2, 'Name must be at least 2 chars long')
                        .required('Name is required'),
                }),
            }),
            resolve: async (parent, { messagingUserInfo }) => {
                let messagingUser = null;

                const organization = await OrganizationRepository.findOrganizationFromKey(
                    messagingUserInfo.organizationKey
                );

                if (!organization) {
                    throw new NotFoundException('organization');
                }

                if (messagingUserInfo.oldToken) {
                    const tokenPayload = TokenUtils.decrypt(
                        messagingUserInfo.oldToken
                    );

                    messagingUser = await MessagingUserRepository.findById(
                        tokenPayload.messagingUser.id
                    );
                }

                if (!messagingUser) {
                    const parameters = [];

                    if (messagingUserInfo.email) {
                        parameters.push({
                            email: messagingUserInfo.email,
                        });
                    }

                    if (messagingUserInfo.uid) {
                        parameters.push({
                            uid: messagingUserInfo.uid,
                        });
                    }

                    messagingUser = await MessagingUserRepository.findClientFromMeta(
                        organization.id,
                        parameters
                    );
                }

                if (!messagingUser) {
                    messagingUser = await MessagingUserRepository.create({
                        name: messagingUserInfo.name || nameGenerator(),
                        email: messagingUserInfo.email || null,
                        uid: messagingUserInfo.uid || null,
                        organizationId: organization.id,
                        lastSeen: DateUtils.now(),
                    });
                }

                return TokenUtils.encrypt({
                    messagingUser,
                });
            },
        },
    },
};
