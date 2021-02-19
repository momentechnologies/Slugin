const UnauthorizedException = require('../../exceptions/unauthorized');
const OrganizationService = require('../../services/organization');

module.exports = async (user, organizationId) => {
    const isUserInOrganization = await OrganizationService.isUserInOrganization(
        user.id,
        organizationId
    );

    if (!isUserInOrganization) {
        throw new UnauthorizedException(
            'Does not have access to organization',
            UnauthorizedException.uids.NO_ACCESS
        );
    }
};
