import { getMultiple } from '../../helpers/stores/genericFetch';
import fetch from '../../helpers/fetch';
import types from './types';

export const getOrganizationCards = (organizationId, params = {}) =>
    getMultiple('card', `/organizations/${organizationId}/cards`, params);

export const addCard = (organizationId, token) => (dispatch, getState) => {
    return fetch(`/organizations/${organizationId}/cards`, 'POST', {
        token,
    }).then(() => {
        dispatch(clearCards());
    });
};

export const clearCards = () => ({
    type: types.CLEAR_ALL,
});
