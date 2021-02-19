const UnauthorizedException = require('../exceptions/unauthorized');
const IsLoggedIn = require('./isLoggedIn');
const OrganizationService = require('../services/organization');

module.exports = () => (req, res, next) =>
    IsLoggedIn(req, res, err => {
        if (err) return next(err);
        if (!req.params.threadId || req.params.threadId.length === 0) {
            return next(new UnauthorizedException());
        }

        OrganizationService.getThreadOrganizationWithUsers(
            req.params.threadId
        ).then(organization => {
            if (!organization.users.find(u => u.id === req.user.id)) {
                return next(new UnauthorizedException());
            }

            req.organization = organization;
            next();
        });
    });
