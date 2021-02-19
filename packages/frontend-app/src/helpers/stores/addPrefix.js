export default (prefix, types) => {
    return types.reduce((response, type) => {
        response[type] = `${prefix}/${type}`;
        return response;
    }, {});
};
