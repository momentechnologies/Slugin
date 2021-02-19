const router = require('express').Router();

const graphqlHTTP = require('express-graphql');

const HandledException = require('../../exceptions/handledError');

const schema = require('./schema');

router.use(
    '/graphql',
    graphqlHTTP((req, res) => ({
        schema,
        graphiql: true,
        formatError: err => {
            let body = {
                message: 'Server error',
                extra: err,
            };

            if (err.originalError instanceof HandledException) {
                body = err.originalError.getBody();
            } else {
                console.error(err.stack);
                body.trace = err.stack;
            }

            body.trace = err.stack;

            return body;
        },
        context: {
            user: req.user,
            cookies: req.cookies,
            res,
            req,
        },
    }))
);

module.exports = router;
