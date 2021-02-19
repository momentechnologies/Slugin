import fetch from '../fetch';
import shouldFetch from './shouldFetch';

import {
    getIdKey,
    getMultipleKey,
    getMultipleCountKey,
} from './genericSelectors';
import { getByIdTypes, getMultipleTypes } from './types';

export const getById = (storeName, url, id) => (dispatch, getState) => {
    const key = getIdKey(id);
    const state = getState();
    if (
        state[storeName].entities[id] ||
        !shouldFetch(state[storeName].meta[key])
    )
        return;

    const types = getByIdTypes(storeName);

    dispatch({
        type: types.GET_BY_ID_START,
        payload: {
            key,
        },
    });

    return fetch(url, 'GET')
        .then(response => {
            dispatch({
                type: types.GET_BY_ID_SUCCESS,
                payload: {
                    response: response.data.data,
                    key,
                },
            });
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: types.GET_BY_ID_ERROR,
                payload: {
                    error,
                    key,
                },
            });
        });
};

export const getMultiple = (storeName, url, params = {}) => (
    dispatch,
    getState
) => {
    const key = getMultipleKey(url, params);

    if (!shouldFetch(getState()[storeName].meta[key])) return;

    const types = getMultipleTypes(storeName);

    dispatch({
        type: types.GET_MULTIPLE_START,
        payload: {
            key,
        },
    });

    return fetch(url, 'GET', params)
        .then(response => {
            dispatch({
                type: types.GET_MULTIPLE_SUCCESS,
                payload: {
                    entities: response.data.data.reduce((entities, entity) => {
                        entities[entity.id] = entity;
                        return entities;
                    }, {}),
                    total: response.data.pageInfo.count,
                    totalKey: getMultipleCountKey(url, params),
                    key,
                },
            });
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: types.GET_MULTIPLE_ERROR,
                payload: {
                    error,
                    key,
                },
            });
        });
};
