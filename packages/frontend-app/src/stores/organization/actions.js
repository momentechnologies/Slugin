import types from './constants';
import fetch from '../../helpers/fetch';

export const setOrganizationId = organizationId => {
    return dispatch => {
        dispatch({
            type: types.CHANGE_ORGANIZATION_ID,
            payload: {
                organizationId,
            },
        });
    };
};

export const invite = (organizationId, email) => dispatch => {
    return fetch(`/organizations/${organizationId}/invite`, 'POST', {
        email,
    }).then(response => {
        dispatch({
            type: types.UPDATE_ORGANIZATION,
            payload: {
                organization: response.data.data.organization,
            },
        });
    });
};

export const updateSettings = (organizationId, values) => dispatch => {
    return fetch(`/organizations/${organizationId}/settings`, 'POST', {
        values,
    }).then(response => {
        dispatch({
            type: types.UPDATE_ORGANIZATION,
            payload: {
                organization: response.data.data.organization,
            },
        });
    });
};
