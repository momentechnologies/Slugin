import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Conversations from './Conversations';
import MeHoc from '../../../hComponents/Me';
import MeContext from '../../../contexts/meContext';

const threadFragment = gql`
    fragment ThreadFragment on Thread {
        id
        organizationId
        assignedUserId
        endedAt
        createdAt
        updatedAt
        messagingUser {
            id
            organizationId
            email
            name
            uid
            lastSeen
        }
        lastMessage {
            id
            message
        }
    }
`;

const NEW_THREAD_SUBSCRIPTION = gql`
    subscription newThread($organizationId: Int!) {
        newThread(organizationId: $organizationId) {
            ...ThreadFragment
        }
    }
    ${threadFragment}
`;

const GET_THREADS = gql`
    query GetThreads($organizationId: Int!, $filters: GetThreadsFilters!) {
        threads(organizationId: $organizationId, filters: $filters) {
            ...ThreadFragment
        }
    }
    ${threadFragment}
`;

const ConversationFetcher = props => {
    const [filters, setFilters] = React.useState({
        new: false,
        ongoing: true,
        done: false,
    });

    return (
        <MeContext.Consumer>
            {({ getSelectedOrganization }) => (
                <Query
                    query={GET_THREADS}
                    variables={{
                        filters,
                        organizationId: props.selectedOrganization.id,
                    }}
                    fetchPolicy="cache-and-network"
                >
                    {({ loading, error, data, subscribeToMore }) => {
                        return (
                            <Conversations
                                {...props}
                                loading={loading}
                                error={error}
                                data={data}
                                onFilterChange={filters => setFilters(filters)}
                                displaySetup={
                                    !getSelectedOrganization(props.location)
                                        .hasAnyThread
                                }
                                filters={filters}
                                subscribe={() => {
                                    subscribeToMore({
                                        document: NEW_THREAD_SUBSCRIPTION,
                                        variables: {
                                            organizationId:
                                                props.selectedOrganization.id,
                                        },
                                        updateQuery: (
                                            prev,
                                            { subscriptionData }
                                        ) => {
                                            if (!subscriptionData.data)
                                                return prev;
                                            const newThread =
                                                subscriptionData.data.newThread;

                                            if (
                                                filters.done !==
                                                !!newThread.endedAt
                                            ) {
                                                return prev;
                                            }

                                            if (
                                                filters.new !==
                                                !!newThread.assignedUserId
                                            ) {
                                                return prev;
                                            }

                                            if (
                                                filters.ongoing ===
                                                !!newThread.endedAt
                                            ) {
                                                return prev;
                                            }

                                            return {
                                                ...prev,
                                                threads: [
                                                    newThread,
                                                    ...prev.threads,
                                                ],
                                            };
                                        },
                                    });
                                }}
                            />
                        );
                    }}
                </Query>
            )}
        </MeContext.Consumer>
    );
};

export default MeHoc()(ConversationFetcher);
