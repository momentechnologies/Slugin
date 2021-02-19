export default requestError => {
    const defaultError = {
        message: 'Something happened',
        key: 'something_happened',
        error: {},
    };

    if (
        !requestError ||
        !requestError.graphQLErrors ||
        !Array.isArray(requestError.graphQLErrors) ||
        requestError.graphQLErrors.length === 0
    ) {
        return defaultError;
    }

    return requestError.graphQLErrors[0];
};
