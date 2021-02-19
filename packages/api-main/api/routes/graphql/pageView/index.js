const url = require('url');
const AnalyticsPageViewModel = require('../../../db').AnalyticsPageView;
const AnalyticsUserModel = require('../../../db').AnalyticsUser;
const OrganizationDomainModel = require('../../../db').OrganizationDomain;
const OrganizationRepository = require('../../../repositories/organization');

module.exports.schema = `  
  type Mutation {
    newPageView(path: String!, organizationKey: String!): Boolean
  }
`;

const userCookie = `_st`;

module.exports.resolvers = {
    Mutation: {
        newPageView: async (
            root,
            { path, organizationKey },
            { res, req, cookies }
        ) => {
            const organization = await OrganizationRepository.findOrganizationFromKey(
                organizationKey
            );

            if (!organization) {
                return false;
            }

            const originUrl = url.parse(req.get('origin'));
            let domain = await OrganizationDomainModel.findOne({
                where: {
                    organizationId: organization.id,
                    domain: originUrl.hostname,
                },
            });

            if (!domain) {
                domain = await OrganizationDomainModel.create({
                    organizationId: organization.id,
                    domain: originUrl.hostname,
                });
            }

            let analyticsUser = null;

            if (cookies[userCookie]) {
                const id = parseInt(
                    Buffer.from(cookies[userCookie], 'base64').toString('ascii')
                );

                analyticsUser = await AnalyticsUserModel.findByPk(id);
            }

            if (!analyticsUser) {
                analyticsUser = await AnalyticsUserModel.create({});
            }

            await AnalyticsPageViewModel.create({
                analyticsUserId: analyticsUser.id,
                domainId: domain.id,
                path,
            });

            res.cookie(
                userCookie,
                Buffer.from(String(analyticsUser.id)).toString('base64'),
                {
                    maxAge: 1000 * 60 * 60 * 24 * 365, // 3 days
                    httpOnly: true,
                }
            );

            return true;
        },
    },
};
