import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import MeContext from '../contexts/meContext';
import { matchPath } from 'react-router-dom';

export default () => WrappedComponent => {
    return props => (
        <Query
            query={gql`
                {
                    me {
                        id
                        firstName
                        lastName
                        email
                        organizations {
                            role
                            organization {
                                id
                                name
                                organizationKey
                                hasAnyThread
                                users {
                                    role
                                    user {
                                        id
                                        email
                                        firstName
                                        lastName
                                    }
                                }
                                settings {
                                    name
                                    value
                                }
                            }
                        }
                    }
                }
            `}
        >
            {({ loading, error, data, refetch }) => {
                const me = data && data.me ? data.me : null;

                const organizations =
                    data && data.me && data.me.organizations
                        ? data.me.organizations.map(organizationUser => ({
                              role: organizationUser.role,
                              ...organizationUser.organization,
                          }))
                        : [];

                return (
                    <MeContext.Provider
                        value={{
                            state: {
                                isAuthenticated: !!me,
                                isAuthenticating: loading,
                                user: me,
                                organizations,
                            },
                            getSelectedOrganization: location => {
                                const threadMatch = matchPath(
                                    location.pathname,
                                    {
                                        path: '/app/:organizationId',
                                        exact: false,
                                    }
                                );

                                if (!threadMatch) return null;

                                const organization = organizations.find(
                                    o =>
                                        o.id ===
                                        parseInt(
                                            threadMatch.params.organizationId
                                        )
                                );

                                return organization ? organization : null;
                            },
                            refetchMe: refetch,
                        }}
                    >
                        <WrappedComponent {...props} />
                    </MeContext.Provider>
                );
            }}
        </Query>
    );
};
