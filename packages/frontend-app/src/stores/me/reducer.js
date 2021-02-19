import types from './constants';

const initialState = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    selectedOrganizationId: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                isAuthenticating: false,
                name: null,
                email: null,
            };
        case types.LOGGED_IN:
            return {
                ...state,
                isAuthenticated: true,
                isAuthenticating: false,
                user: action.payload.user,
            };
        case types.SETUP_DONE:
            return {
                ...state,
                user: {
                    ...state.user,
                    setupDone: true,
                },
            };
        default:
            return state;
    }
};
