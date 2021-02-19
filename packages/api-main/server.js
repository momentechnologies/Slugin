const app = require('express')();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const schema = require('./api/routes/graphql/schema');
const EndpointNotFoundException = require('./api/exceptions/endpointNotFound');
const server = require('http').Server(app);

const api = require('./api/routes');
const appConfig = require('./api/config/app');
const socketSetup = require('./socketSetup');

require('./api/passport');

socketSetup();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.get('origin'));
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Token, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(new EndpointNotFoundException(req.url, req.method));
});

app.use(require('./api/middlewares/ExceptionHandler'));

server.listen(appConfig.port, () => {
    new SubscriptionServer(
        {
            execute,
            subscribe,
            schema,
        },
        {
            server: server,
            path: '/subscriptions',
        }
    );
    console.log(`Listening on port ${appConfig.port}`);
});
