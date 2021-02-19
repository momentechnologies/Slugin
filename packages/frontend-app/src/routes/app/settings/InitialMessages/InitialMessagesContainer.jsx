import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

import Theme from './InitialMessages';
import MeHoc from '../../../../hComponents/Me';

const UPDATE_INITIAL_MESSAGES = gql`
    mutation updateInitialMessages(
        $organizationId: Int!
        $messages: [String]!
    ) {
        updateInitialMessages(
            organizationId: $organizationId
            messages: $messages
        ) {
            id
            message
        }
    }
`;

const GET_ORGANIZATION_INITIAL_MESSAGES = gql`
    query OrganizationInitialMessages($organizationId: Int!) {
        organization(organizationId: $organizationId) {
            initialMessages {
                id
                message
            }
        }
    }
`;

const InitialMessagesContainer = props => (
    <Query
        query={GET_ORGANIZATION_INITIAL_MESSAGES}
        variables={{
            organizationId: props.selectedOrganization.id,
        }}
    >
        {({ loading, error, data }) => (
            <Mutation
                mutation={UPDATE_INITIAL_MESSAGES}
                update={(cache, { data: { updateInitialMessages } }) => {
                    const { organization } = cache.readQuery({
                        query: GET_ORGANIZATION_INITIAL_MESSAGES,
                        variables: {
                            organizationId: props.selectedOrganization.id,
                        },
                    });

                    cache.writeQuery({
                        query: GET_ORGANIZATION_INITIAL_MESSAGES,
                        data: {
                            organization: {
                                ...organization,
                                initialMessages: updateInitialMessages,
                            },
                        },
                        variables: {
                            organizationId: props.selectedOrganization.id,
                        },
                    });
                }}
            >
                {(
                    updateInitialMessages,
                    { loading: saving, error: errorSaving }
                ) => (
                    <Theme
                        {...props}
                        loading={loading}
                        error={error}
                        saving={saving}
                        errorSaving={errorSaving}
                        initialMessages={
                            data && data.organization
                                ? data.organization.initialMessages.map(
                                      m => m.message
                                  )
                                : []
                        }
                        updateInitialMessages={messages =>
                            updateInitialMessages({
                                variables: {
                                    organizationId:
                                        props.selectedOrganization.id,
                                    messages,
                                },
                            }).then(() => {
                                props.onSaveDone();
                            })
                        }
                    />
                )}
            </Mutation>
        )}
    </Query>
);

InitialMessagesContainer.defaultProps = {
    onSaveDone: () => {},
};

export default MeHoc()(InitialMessagesContainer);
