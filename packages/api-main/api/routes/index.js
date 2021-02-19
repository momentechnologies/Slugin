const router = require('express').Router();
const apiRouter = require('express').Router();
const AddUserToRequest = require('../middlewares/AddUserToRequest');

apiRouter.use(AddUserToRequest, require('./graphql'));

router.use('/api', apiRouter);

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Slugin API',
        data: {
            releaseDate: '',
            commitHash: '',
        },
    });
});

router.get('/healthz', (req, res) => {
    res.json({
        ok: true,
    });
});

module.exports = router;
