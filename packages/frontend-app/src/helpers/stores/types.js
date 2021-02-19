import addPrefix from './addPrefix';

export const getByIdTypes = storeName =>
    addPrefix(storeName, [
        'GET_BY_ID_START',
        'GET_BY_ID_SUCCESS',
        'GET_BY_ID_ERROR',
    ]);

export const getMultipleTypes = storeName =>
    addPrefix(storeName, [
        'GET_MULTIPLE_START',
        'GET_MULTIPLE_SUCCESS',
        'GET_MULTIPLE_ERROR',
    ]);
