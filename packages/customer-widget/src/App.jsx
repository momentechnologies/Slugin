import React from 'react';
import { ApolloProvider } from 'react-apollo';
import Root from './RootContainer';
import OrganizationContainer from './components/OrganizationContainer';
import apolloClient from './helpers/apolloClient';

export default ({ clientInfo }) => (
    <ApolloProvider client={apolloClient}>
        <OrganizationContainer>
            {(loading, organization) => (
                <Root
                    loading={loading}
                    organization={organization}
                    clientInfo={clientInfo}
                />
            )}
        </OrganizationContainer>
    </ApolloProvider>
);
