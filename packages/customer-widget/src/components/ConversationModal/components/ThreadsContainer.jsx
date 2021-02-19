import React from 'react';
import { Mutation, Query } from 'react-apollo/index';
import gql from 'graphql-tag';
import Loader from '../../Loader';

const GET_THREADS = gql`
    query MessagingUserThreads($messagingUserToken: String!) {
        messagingUserThreads(messagingUserToken: $messagingUserToken) {
            id
            endedAt
            createdAt
            clientLastSeen
            lastMessage {
                message
                isFromClient
            }
        }
    }
`;

const NEW_THREAD = gql`
    mutation NewMessagingUserThread(
        $messagingUserToken: String!
        $message: String!
    ) {
        newMessagingUserThread(
            messagingUserToken: $messagingUserToken
            message: $message
        ) {
            id
            endedAt
            createdAt
            clientLastSeen
            lastMessage {
                message
                isFromClient
            }
        }
    }
`;

const UPDATE_THREAD = gql`
    mutation UpdateMessagingUserThread(
        $messagingUserToken: String!
        $threadId: Int!
        $lastSeen: DateTime!
    ) {
        updateMessagingUserThread(
            messagingUserToken: $messagingUserToken
            threadId: $threadId
            lastSeen: $lastSeen
        ) {
            id
            endedAt
            createdAt
            clientLastSeen
            lastMessage {
                message
                isFromClient
            }
        }
    }
`;

export default props => (
    <Query
        query={GET_THREADS}
        variables={{
            messagingUserToken: props.token,
        }}
    >
        {({ loading, error, data }) => {
            if (loading) {
                return <Loader />;
            }

            if (error) {
                return <div>Something happened</div>;
            }

            return (
                <Mutation
                    mutation={NEW_THREAD}
                    update={(cache, { data: { newMessagingUserThread } }) => {
                        const { messagingUserThreads } = cache.readQuery({
                            query: GET_THREADS,
                            variables: {
                                messagingUserToken: props.token,
                            },
                        });

                        cache.writeQuery({
                            query: GET_THREADS,
                            data: {
                                messagingUserThreads: messagingUserThreads.concat(
                                    newMessagingUserThread
                                ),
                            },
                            variables: {
                                messagingUserToken: props.token,
                            },
                        });
                    }}
                >
                    {newMessagingUserThread => (
                        <Mutation
                            mutation={UPDATE_THREAD}
                            update={(
                                cache,
                                { data: { updateMessagingUserThread } }
                            ) => {
                                const {
                                    messagingUserThreads,
                                } = cache.readQuery({
                                    query: GET_THREADS,
                                    variables: {
                                        messagingUserToken: props.token,
                                    },
                                });

                                cache.writeQuery({
                                    query: GET_THREADS,
                                    data: {
                                        messagingUserThreads: messagingUserThreads.map(
                                            mut =>
                                                updateMessagingUserThread.id ===
                                                mut.id
                                                    ? updateMessagingUserThread
                                                    : mut
                                        ),
                                    },
                                    variables: {
                                        messagingUserToken: props.token,
                                    },
                                });
                            }}
                        >
                            {updateMessagingUserThread =>
                                props.children(
                                    data.messagingUserThreads,
                                    message =>
                                        newMessagingUserThread({
                                            variables: {
                                                messagingUserToken: props.token,
                                                message,
                                            },
                                        }).then(
                                            data =>
                                                data.data.newMessagingUserThread
                                        ),
                                    (threadId, lastSeen) =>
                                        updateMessagingUserThread({
                                            variables: {
                                                messagingUserToken: props.token,
                                                threadId,
                                                lastSeen,
                                            },
                                        })
                                )
                            }
                        </Mutation>
                    )}
                </Mutation>
            );
        }}
    </Query>
);
