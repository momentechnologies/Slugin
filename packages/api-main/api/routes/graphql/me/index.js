const bcrypt = require('bcryptjs');
const Authorization = require('../../../middlewares/authorization');
const GenericException = require('../../../exceptions/generic');
const TokenUtils = require('../../../utils/token');
const UserModel = require('../../../db').User;

module.exports.schema = `
  type Query {
    me: User
  }
  
  type Mutation {
    login(email: String, password: String) : Int
    logout: Boolean
  }
`;

module.exports.resolvers = {
    Query: {
        me: Authorization()(async (root, { threadId }, context) => {
            return context.user;
        }),
    },
    Mutation: {
        login: async (root, { email, password }, context) => {
            const user = await UserModel.findOne({
                where: {
                    email,
                },
            });

            if (!user || !bcrypt.compareSync(password, user.password)) {
                throw new GenericException(
                    'Incorrect email or password.',
                    'wrong_credentials'
                );
            }

            context.res.cookie('jwt', TokenUtils.encrypt({ user }), {
                maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
                httpOnly: true,
            });

            return user.id;
        },
        logout: async (root, {}, context) => {
            context.res.clearCookie('jwt');

            return true;
        },
    },
};
