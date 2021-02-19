const {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime,
} = require('graphql-iso-date');

module.exports.schema = `
    scalar Date
    scalar Time
    scalar DateTime
`;

module.exports.resolvers = {
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime,
};
