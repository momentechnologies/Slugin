const UnauthorizedException = require('../../exceptions/unauthorized');
const OrganizationService = require('../../services/organization');

module.exports = async (user, threadId) => {
    const organization = await OrganizationService.getThreadOrganizationWithUsers(
        threadId
    );

    if (!organization.users.find(u => u.id === user.id)) {
        throw new UnauthorizedException(
            'Does not have access to thread',
            UnauthorizedException.uids.NO_ACCESS
        );
    }
};
