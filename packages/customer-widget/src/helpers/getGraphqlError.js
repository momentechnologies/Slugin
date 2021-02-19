export default requestError => {
    const defaultError = {
        message: 'Noe skjedde',
        key: 'something_happened',
        error: {},
    };

    if (
        !requestError.graphQLErrors ||
        !Array.isArray(requestError.graphQLErrors) ||
        requestError.graphQLErrors.length === 0
    ) {
        return defaultError;
    }

    return requestError.graphQLErrors[0];
};
