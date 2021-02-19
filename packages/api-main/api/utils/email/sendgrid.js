const sgMail = require('@sendgrid/mail');
const sendgridConfig = require('../../config/email');

sgMail.setApiKey(sendgridConfig.sendGridApiKey);

module.exports = sgMail;
