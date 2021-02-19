import apiConfig from '../config/api.js';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
    uri: apiConfig.apiUrl + '/api/graphql',
    credentials: 'include',
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `${apiConfig.subscriptionApiUrl}/subscriptions`,
    options: {
        reconnect: true,
    },
    credentials: 'include',
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
);

export default new ApolloClient({
    link,
    cache: new InMemoryCache(),
});
