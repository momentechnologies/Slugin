const Organization = require('../db').Organization;
const OrganizationSetting = require('../db').OrganizationSetting;
const User = require('../db').User;
const NotFoundException = require('../exceptions/notFound');

const organizationIncludes = [
    {
        model: User,
    },
    {
        model: OrganizationSetting,
        as: 'settings',
    },
];

const findById = async id => {
    return await Organization.findOne({
        where: {
            id,
        },
        include: organizationIncludes,
    });
};

module.exports.findById = findById;

module.exports.findUserOrganizations = async userId => {
    const user = await User.findOne({
        include: [
            {
                model: Organization,
                include: organizationIncludes,
            },
        ],
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new NotFoundException('user');
    }

    return user.organizations;
};

module.exports.findOrganizationFromKey = async organizationKey => {
    return await Organization.findOne({
        where: { organizationKey },
        include: organizationIncludes,
    });
};

module.exports.addOrganizationUser = async (organizationId, user) => {
    const organization = await findById(organizationId, false);

    await organization.addUser(user, { through: { role: 'admin' } });

    return;
};
