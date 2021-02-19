import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import makeRootReducer from './';

export default (initialState = {}) => {
    const middleware = [thunk];
    const enhancers = [];

    let composeEnhancers = compose;

    if (process.env.NODE_ENV === 'development') {
        const composeWithDevToolsExtension = window
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : null;
        if (typeof composeWithDevToolsExtension === 'function') {
            composeEnhancers = composeWithDevToolsExtension;
        }
    }

    const store = createStore(
        makeRootReducer(),
        initialState,
        composeEnhancers(applyMiddleware(...middleware), ...enhancers)
    );

    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('./', () => {
            const reducers = require('./').default;
            store.replaceReducer(reducers());
        });
    }

    return store;
};
