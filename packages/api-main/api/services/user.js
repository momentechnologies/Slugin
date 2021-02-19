const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const UserRepository = require('../repositories/user');
const OrganizationRepository = require('../repositories/organization');
const OrganizationModel = require('../db').Organization;
const Email = require('../utils/email');
const token = require('../utils/token');
const NotFound = require('../exceptions/notFound');
const ValidationException = require('../exceptions/validation');

module.exports.me = async user => {
    const userOrganizations = await OrganizationRepository.findUserOrganizations(
        user.id
    );

    return {
        user,
        organizations: userOrganizations,
    };
};

module.exports.invite = async (organizationId, email) => {
    let user = await UserRepository.getByEmail(email);

    const organization = await OrganizationRepository.findById(organizationId);

    if (!organization) {
        throw new NotFound('organization');
    }

    if (!user) {
        user = await UserRepository.create({
            email,
            emailConfirmed: false,
        });

        await newConfirmationEmail(user);
    } else if (organization.users.find(u => u.id === user.id)) {
        return user.id;
    }

    await OrganizationRepository.addOrganizationUser(organizationId, user);

    return user.id;
};

module.exports.signup = async (
    organizationName,
    email,
    lastName,
    firstName,
    password,
    newsletterText
) => {
    const existingUser = await UserRepository.getByEmail(email);

    if (existingUser) {
        throw new ValidationException([
            ValidationException.createError(
                'email',
                'params',
                'Email is already used'
            ),
        ]);
    }

    const user = await UserRepository.create({
        email: email,
        firstName: firstName,
        lastName: lastName,
        emailConfirmed: false,
        password: bcrypt.hashSync(password, 8),
        newsletterText: newsletterText ? newsletterText : null,
    });

    const organization = await OrganizationModel.create({
        name: organizationName,
        organizationKey: uuid.v4(),
    });

    await organization.addUser(user, { through: { role: 'admin' } });

    delete user.password;

    await newConfirmationEmail(user);

    return {
        token: token.encrypt({ user }),
        user,
    };
};

const confirmEmail = async tokenString => {
    const jwtPayload = token.decrypt(tokenString);

    if (!jwtPayload.user.email || !jwtPayload.confirmEmail) {
        throw new Error('Problems with the payload of the token');
    }

    const user = await UserRepository.update(jwtPayload.user.id, {
        emailConfirmed: true,
    });

    return {
        data: {
            user,
        },
    };
};

const newConfirmationEmailToken = user =>
    token.encrypt({
        user,
        confirmEmail: true,
    });

const newConfirmationEmail = async user => {
    const token = newConfirmationEmailToken(user);

    await Email.sendConfirmationEmail(user.email, token);
};

module.exports.confirmEmail = confirmEmail;
module.exports.newConfirmationEmail = newConfirmationEmail;
module.exports.newConfirmationEmailToken = newConfirmationEmailToken;
