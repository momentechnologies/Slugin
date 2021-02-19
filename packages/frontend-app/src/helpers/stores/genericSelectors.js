const selectMetaHelper = (meta, defaultIsLoading = true) => {
    if (meta) return meta;

    return {
        loading: defaultIsLoading,
        error: false,
        loadedAt: null,
        ids: [],
    };
};

const selectMeta = (storeName, state, url, params) =>
    selectMetaHelper(state[storeName].meta[getMultipleKey(url, params)]);

export const getIdKey = id => `by_id_${id}`;

export const getMultipleKey = (url, params) =>
    `multiple_${url}_${JSON.stringify(params)}`;

export const getMultipleCountKey = (url, params) =>
    getMultipleKey(
        url,
        Object.keys(params).reduce((newParams, key) => {
            if (key !== 'limit' && key !== 'offset') {
                newParams[key] = params[key];
            }
            return newParams;
        }, {})
    );

export const selectOne = (storeName, state, id) => {
    const entity = state[storeName].entities[id];
    return {
        entity,
        meta: selectMetaHelper(state[storeName].meta[getIdKey(id)], !entity),
    };
};

export const select = (storeName, state, url, params) => {
    return {
        entities: selectMeta(storeName, state, url, params).ids.map(
            id => state[storeName].entities[id]
        ),
        meta: selectMetaHelper(
            state[storeName].meta[getMultipleKey(url, params)]
        ),
        pagination: {
            count: selectCount(storeName, state, url, params),
        },
    };
};

const selectCount = (storeName, state, url, params) => {
    const count = state[storeName].counts[getMultipleCountKey(url, params)];
    if (count >= 0) return count;
    return null;
};
