module.exports = {
    port: process.env.CONFIG_APP_PORT || 80,
    graphqlSocketPort: process.env.CONFIG_APP_PORT || 5002,
    url: process.env.CONFIG_APP_URL || 'http://localhost:3000',
    googleProjectId: 'slugin',
};
