import getEnv from '../helpers/getEnv.js';

export default {
    apiUrl: getEnv('REACT_APP_API_URL', 'https://api.local.slugin.io'),
    subscriptionApiUrl: getEnv(
        'REACT_APP_SUBSCRIPTION_API_URL',
        'ws://api.local.slugin.io'
    ),
};
