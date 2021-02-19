import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import createStore from './stores/createStore';
import Routes from './routes';
import apolloClient from './helpers/apolloClient';

const store = createStore();

export default () => (
    <ApolloProvider client={apolloClient}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    </ApolloProvider>
);
