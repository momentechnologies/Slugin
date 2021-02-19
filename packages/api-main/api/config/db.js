module.exports = {
    username: process.env.CONFIG_DB_USER || 'postgres',
    password: process.env.CONFIG_DB_PASSWORD || 'postgres',
    database: process.env.CONFIG_DB_DATABASE || 'slugin',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    operatorsAliases: false,
};
