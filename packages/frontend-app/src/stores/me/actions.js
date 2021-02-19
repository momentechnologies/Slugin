import types from './constants';
import fetch from '../../helpers/fetch';

export const status = () => {
    return dispatch => {
        fetch('/me', 'GET').then(
            response => {
                dispatch(
                    loggedIn(response.data.user, response.data.organizations)
                );
            },
            () => {
                dispatch(logout());
            }
        );
    };
};

export const logout = () => {
    return dispatch => {
        dispatch({
            type: types.LOGOUT,
        });
    };
};

export const loggedIn = (userInfo, organizations) => {
    return dispatch => {
        dispatch({
            type: types.LOGGED_IN,
            payload: {
                userInfo,
                organizations,
            },
        });
    };
};
