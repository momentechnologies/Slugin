import moment from 'moment';
import { getByIdTypes, getMultipleTypes } from './types';

export const genericReducer = (storeName, state, action, reducer) => {
    const byIdTypes = getByIdTypes(storeName);
    const multipleTypes = getMultipleTypes(storeName);

    switch (action.type) {
        case byIdTypes.GET_BY_ID_START:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    [action.payload.key]: {
                        loading: true,
                        error: false,
                        loadedAt: null,
                    },
                },
            };
        case byIdTypes.GET_BY_ID_SUCCESS:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [action.payload.response.id]: action.payload.response,
                },
                meta: {
                    ...state.meta,
                    [action.payload.key]: {
                        loading: false,
                        error: false,
                        loadedAt: moment().unix(),
                    },
                },
            };
        case byIdTypes.GET_BY_ID_ERROR:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    [action.payload.key]: {
                        loading: false,
                        error: action.payload.error,
                        loadedAt: moment().unix(),
                    },
                },
            };
        case multipleTypes.GET_MULTIPLE_START:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    [action.payload.key]: {
                        loading: true,
                        error: false,
                        loadedAt: null,
                        ids: [],
                    },
                },
            };
        case multipleTypes.GET_MULTIPLE_SUCCESS:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    ...action.payload.entities,
                },
                meta: {
                    ...state.meta,
                    [action.payload.key]: {
                        loading: false,
                        error: false,
                        loadedAt: moment().unix(),
                        ids: Object.keys(action.payload.entities),
                    },
                },
                counts: {
                    ...state.counts,
                    [action.payload.totalKey]: action.payload.total,
                },
            };
        case multipleTypes.GET_MULTIPLE_ERROR:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    [action.payload.key]: {
                        loading: false,
                        error: action.payload.error,
                        loadedAt: moment().unix(),
                        ids: [],
                    },
                },
            };
        default:
            if (reducer) {
                return reducer(state, action);
            }
            return state;
    }
};
