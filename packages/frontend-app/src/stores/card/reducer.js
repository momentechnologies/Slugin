import { genericReducer } from '../../helpers/stores/genericReducer';
import types from './types';

const initialState = {
    entities: {},
    meta: {},
    counts: {},
};

export default (state = initialState, action) =>
    genericReducer('card', state, action, (state, action) => {
        switch (action.type) {
            case types.CLEAR_ALL:
                return initialState;
            default:
                return state;
        }
    });
