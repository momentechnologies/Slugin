import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default props => (
    <Query
        query={gql`
            query MessagingOrganization($key: String!) {
                messagingOrganization(key: $key) {
                    name
                    organizationKey
                    settings {
                        name
                        value
                    }
                    initialMessages {
                        id
                        message
                    }
                }
            }
        `}
        variables={{
            key: window.sluginSettings.organizationKey,
        }}
    >
        {({ loading, error, data }) => {
            const organization =
                data && !loading && !error ? data.messagingOrganization : null;

            if (!organization) {
                return <span />;
            }

            return props.children(loading, organization);
        }}
    </Query>
);
