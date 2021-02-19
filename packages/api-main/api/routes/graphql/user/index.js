const yup = require('yup');
const bcrypt = require('bcryptjs');
const UserService = require('../../../services/user');
const UserModel = require('../../../db').User;
const OrganizationRepository = require('../../../repositories/organization');
const Authorization = require('../../../middlewares/authorization');
const TokenUtils = require('../../../utils/token');
const Unauthorized = require('../../../exceptions/unauthorized');
const NotFound = require('../../../exceptions/notFound');

module.exports.schema = `
  type Mutation {
    inviteUserToOrganization(email: String!, organizationId: Int!) : Int!
    confirmUser(token: String!, firstName: String, lastName: String, password: String) : ConfirmUserPayload!
    createNewUser(organizationName: String, email: String, firstName: String, lastName: String, password: String, newsletterText: String) : User
    updateUserInfo(userId: Int!, firstName: String, lastName: String) : User
  }
  
  type ConfirmUserPayload {
    error: ResponseError
    userId: Int
  }
  
  type User {
    id: Int
    firstName: String
    lastName: String
    email: String
    emailConfirmed: Int
    organizations: [UserOrganization]
  }
  
  type UserOrganization {
    role: String
    organization: Organization
  }
`;

module.exports.resolvers = {
    Mutation: {
        inviteUserToOrganization: Authorization((root, { organizationId }) => ({
            organizationId,
        }))(async (root, { organizationId, email }) => {
            return await UserService.invite(organizationId, email);
        }),
        createNewUser: {
            validationSchema: yup.object().shape({
                organizationName: yup
                    .string()
                    .trim()
                    .required()
                    .min(2, 'Organization name is too short'),
                email: yup
                    .string()
                    .trim()
                    .required()
                    .email('You must enter a valid email'),
                lastName: yup
                    .string()
                    .trim()
                    .required()
                    .min(2, 'Last name is too short'),
                firstName: yup
                    .string()
                    .trim()
                    .required()
                    .min(2, 'First name is too short'),
                password: yup
                    .string()
                    .trim()
                    .required()
                    .min(6, 'Password is too short. Must be at least 6 char'),
                newsletterText: yup.string().trim(),
            }),
            resolve: async (
                root,
                {
                    organizationName,
                    email,
                    lastName,
                    firstName,
                    password,
                    newsletterText,
                },
                context
            ) => {
                const response = await UserService.signup(
                    organizationName,
                    email,
                    lastName,
                    firstName,
                    password,
                    newsletterText
                );

                context.res.cookie('jwt', response.token, {
                    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
                    httpOnly: true,
                });

                return response.user;
            },
        },
        confirmUser: {
            validationSchema: yup.object().shape({
                token: yup
                    .string()
                    .trim()
                    .required()
                    .min(20, 'Token is too short'),
                lastName: yup
                    .string()
                    .trim()
                    .min(2, 'Last name is too short'),
                firstName: yup
                    .string()
                    .trim()
                    .min(2, 'First name is too short'),
                password: yup
                    .string()
                    .trim()
                    .min(6, 'Password is too short. Must be at least 6 char'),
            }),
            resolve: async (
                root,
                { token, lastName, firstName, password },
                context
            ) => {
                const tokenPayload = TokenUtils.decrypt(token);
                const user = await UserModel.findByPk(tokenPayload.user.id);
                let update = {};

                if (!tokenPayload.user.password) {
                    if (!lastName || !firstName || !password) {
                        return {
                            error:
                                'Last name, first name and password are all required.',
                        };
                    }

                    update = {
                        lastName,
                        firstName,
                        password: bcrypt.hashSync(password, 8),
                    };
                }
                await user.update({ ...update, emailConfirmed: true });

                const jwt = TokenUtils.encrypt({ user });

                context.res.cookie('jwt', jwt, {
                    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
                    httpOnly: true,
                });

                return {
                    userId: user.id,
                };
            },
        },
        updateUserInfo: {
            validationSchema: yup.object().shape({
                lastName: yup
                    .string()
                    .trim()
                    .min(2, 'Last name is too short'),
                firstName: yup
                    .string()
                    .trim()
                    .min(2, 'First name is too short'),
            }),
            resolve: Authorization(() => ({}))(
                async (root, { userId, firstName, lastName }, context) => {
                    if (context.user.id !== userId) {
                        throw new Unauthorized(
                            'Not authorized',
                            Unauthorized.uids.NOT_LOGGED_IN
                        );
                    }

                    const user = await UserModel.findByPk(userId);

                    if (!user) {
                        throw new NotFound('user');
                    }

                    await user.update({
                        firstName,
                        lastName,
                    });

                    return user;
                }
            ),
        },
    },
    User: {
        organizations: async parent => {
            const organizations = await OrganizationRepository.findUserOrganizations(
                parent.id
            );

            return organizations.map(organization => ({
                role: organization.organizationUser.role,
                organization,
            }));
        },
    },
};
