const User = require('../db').User;
const NotFoundException = require('../exceptions/notFound');

module.exports.getByEmail = async email => {
    return await User.findOne({ where: { email } });
};

const getById = async id => {
    return await User.findByPk(id);
};

module.exports.getById = getById;

module.exports.create = async user => {
    return await User.create(user);
};

module.exports.update = async (id, data) => {
    const user = await getById(id);

    if (!user) {
        throw new NotFoundException('user');
    }

    await user.update(data);

    return user;
};
