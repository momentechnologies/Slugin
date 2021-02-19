const ThreadRepository = require('../repositories/thread');
const OrganizationRepository = require('../repositories/organization');
const OrganizationSetting = require('../db').OrganizationSetting;
const NotFoundException = require('../exceptions/notFound');
const stripe = require('../utils/stripe');
const CardModel = require('../db').Card;

module.exports.getOrganizationByKey = async key => {
    const organization = await OrganizationRepository.findOrganizationFromKey(
        key
    );

    if (!organization) {
        throw new NotFoundException('organization');
    }

    return organization;
};

module.exports.getThreadOrganizationWithUsers = async threadId => {
    const thread = await ThreadRepository.findById(threadId);

    if (!thread) {
        throw new NotFoundException('thread');
    }

    const organization = await OrganizationRepository.findById(
        thread.organizationId,
        true
    );

    if (!organization) {
        throw new NotFoundException('organization');
    }

    return organization;
};

module.exports.getOrganizationCards = async organizationId => {
    return await CardModel.findAll({ where: { organizationId } });
};

module.exports.isUserInOrganization = async (userId, organizationId) => {
    const organization = await OrganizationRepository.findById(
        organizationId,
        true
    );

    if (!organization) {
        throw new NotFoundException('organization');
    }

    return !!organization.users.find(u => u.id === userId);
};

module.exports.updateSettings = async (organizationId, name, value) => {
    let organizationSetting = await OrganizationSetting.findOne({
        where: {
            organizationId,
            name,
        },
    });

    if (organizationSetting) {
        await organizationSetting.update({
            value,
        });
    } else {
        organizationSetting = await OrganizationSetting.create({
            organizationId,
            name,
            value,
        });
    }

    return organizationSetting;
};

module.exports.addCard = async (organizationId, token) => {
    const organization = await OrganizationRepository.findById(organizationId);

    if (!organization) {
        return {
            error: {
                message: 'Organization not found',
            },
        };
    }

    if (!organization.stripeId) {
        const stripeCustomer = await stripe.customers.create({
            description: organization.name,
            metadata: {
                id: organization.id,
                organizationName: organization.name,
            },
        });

        await organization.update({
            stripeId: stripeCustomer.id,
        });
    }

    const stripeCard = await stripe.customers.createSource(
        organization.stripeId,
        {
            source: token,
        }
    );

    const card = await CardModel.create({
        organizationId: organization.id,
        last4: stripeCard.last4,
        expiresMonth: stripeCard.exp_month,
        expiresYear: stripeCard.exp_year,
        stripeId: stripeCard.id,
        primary: true,
    });

    return {
        card,
    };
};

module.exports.getOrganizationEmail = organization => {
    return `${organization.organizationKey}@customer.mail.slugin.io`;
};
