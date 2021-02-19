const { validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const ValidationException = require('../exceptions/validation');

module.exports = (req, defaultValues = {}) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ValidationException(errors.mapped());
    }

    let data = matchedData(req, {
        includeOptionals: true,
    });

    Object.keys(defaultValues).forEach(key => {
        if (data[key] === undefined) {
            data[key] = defaultValues[key];
        }
    });

    return data;
};
