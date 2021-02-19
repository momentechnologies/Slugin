const { makeExecutableSchema } = require('graphql-tools');
const { mergeTypes } = require('merge-graphql-schemas');
const { applyMiddleware } = require('graphql-middleware');
const _ = require('lodash');

const YupValidation = require('../../middlewares/YupValidation');

const get = services => {
    return {
        typeDefs: mergeTypes(services.map(s => s.schema).filter(s => s), {
            all: true,
        }),
        resolvers: services.reduce(
            (resolvers, service) =>
                service.resolvers
                    ? _.merge({}, resolvers, service.resolvers)
                    : resolvers,
            {}
        ),
    };
};

const schema = makeExecutableSchema(
    get([
        require('./me'),
        require('./message'),
        require('./messagingUser'),
        require('./organization'),
        require('./organizationUserNotification'),
        require('./pageView'),
        require('./reply'),
        require('./thread'),
        require('./user'),
        require('./models'),
        require('./externalTypes'),
    ])
);

module.exports = applyMiddleware(schema, YupValidation);
