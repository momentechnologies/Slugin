const Unauthorized = require('../exceptions/unauthorized');
const ValidationException = require('../exceptions/validation');
const IsLoggedIn = require('./isLoggedIn');
const OrganizationService = require('../services/organization');

module.exports = () => (req, res, next) =>
    IsLoggedIn(req, res, err => {
        if (err) return next(err);
        if (!req.params.organizationId || req.params.organizationId <= 0) {
            return next(
                new ValidationException([
                    ValidationException.createError(
                        'organizationId',
                        'url',
                        'invalid organization id. Must be provided and greater than 0'
                    ),
                ])
            );
        }

        OrganizationService.isUserInOrganization(
            req.user.id,
            req.params.organizationId
        )
            .then(isUserInOrganization => {
                if (!isUserInOrganization) {
                    return next(
                        new Unauthorized(
                            'You do not have access to this organization'
                        )
                    );
                }

                next();
            })
            .catch(next);
    });
