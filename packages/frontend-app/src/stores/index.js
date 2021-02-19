import { combineReducers } from 'redux';
import me from './me/reducer';
import organization from './organization/reducer';
import card from './card/reducer';

export const makeRootReducer = () => {
    return combineReducers({
        card,
        me,
        organization,
    });
};

export default makeRootReducer;
