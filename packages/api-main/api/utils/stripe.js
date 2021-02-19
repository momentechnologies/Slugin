const stripeConfig = require('../config/stripe');
const stripe = require('stripe')(stripeConfig.privateKey);

module.exports = stripe;
