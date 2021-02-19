import React from 'react';
import { Query, Mutation } from 'react-apollo/index';
import gql from 'graphql-tag';
import Loader from '../../Loader';

const GET_THREAD_MESSAGES = gql`
    query MessagingUserThreadMessages(
        $threadId: Int!
        $messagingUserToken: String!
    ) {
        messagingUserMessages(
            threadId: $threadId
            messagingUserToken: $messagingUserToken
        ) {
            id
            message
            date
            isFromClient
            clientSeen
        }
    }
`;

const NEW_THREAD_MESSAGE = gql`
    mutation NewMessagingUserMessage(
        $messagingUserToken: String!
        $threadId: Int!
        $message: String!
    ) {
        newMessagingUserMessage(
            threadId: $threadId
            messagingUserToken: $messagingUserToken
            message: $message
        ) {
            id
            message
            date
            isFromClient
            clientSeen
        }
    }
`;

const UPDATE_LAST_SEEN = gql`
    mutation MessagingUserMessageSeen(
        $messagingUserToken: String!
        $threadId: Int!
        $messageId: Int!
    ) {
        messagingUserMessageSeen(
            messagingUserToken: $messagingUserToken
            threadId: $threadId
            messageId: $messageId
        ) {
            id
            message
            date
            isFromClient
            clientSeen
        }
    }
`;

const Content = ({ children, startPolling, stopPolling }) => {
    React.useEffect(() => {
        startPolling(10000);
        return () => {
            stopPolling();
        };
    });

    return children;
};

export default props => (
    <Query
        query={GET_THREAD_MESSAGES}
        variables={{
            messagingUserToken: props.token,
            threadId: props.thread.id,
        }}
        fetchPolicy="network-only"
    >
        {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) {
                return <Loader />;
            }

            if (error) {
                return <div>Something happened</div>;
            }

            return (
                <Content startPolling={startPolling} stopPolling={stopPolling}>
                    <Mutation
                        mutation={UPDATE_LAST_SEEN}
                        update={(
                            cache,
                            { data: { messagingUserMessageSeen } }
                        ) => {
                            const { messagingUserMessages } = cache.readQuery({
                                query: GET_THREAD_MESSAGES,
                                variables: {
                                    messagingUserToken: props.token,
                                    threadId: props.thread.id,
                                },
                            });

                            cache.writeQuery({
                                query: GET_THREAD_MESSAGES,
                                data: {
                                    messagingUserMessages: messagingUserMessages.map(
                                        mum =>
                                            messagingUserMessageSeen.find(
                                                mums => mums.id === mum.id
                                            ) || mum
                                    ),
                                },
                                variables: {
                                    messagingUserToken: props.token,
                                    threadId: props.thread.id,
                                },
                            });
                        }}
                    >
                        {updateLastSeen => (
                            <Mutation
                                mutation={NEW_THREAD_MESSAGE}
                                update={(
                                    cache,
                                    { data: { newMessagingUserMessage } }
                                ) => {
                                    const {
                                        messagingUserMessages,
                                    } = cache.readQuery({
                                        query: GET_THREAD_MESSAGES,
                                        variables: {
                                            messagingUserToken: props.token,
                                            threadId: props.thread.id,
                                        },
                                    });

                                    cache.writeQuery({
                                        query: GET_THREAD_MESSAGES,
                                        data: {
                                            messagingUserMessages: messagingUserMessages.concat(
                                                newMessagingUserMessage
                                            ),
                                        },
                                        variables: {
                                            messagingUserToken: props.token,
                                            threadId: props.thread.id,
                                        },
                                    });
                                }}
                            >
                                {newMessagingUserMessage => {
                                    return props.children(
                                        data.messagingUserMessages,
                                        message =>
                                            newMessagingUserMessage({
                                                variables: {
                                                    messagingUserToken:
                                                        props.token,
                                                    threadId: props.thread.id,
                                                    message,
                                                },
                                            }),
                                        messageId =>
                                            updateLastSeen({
                                                variables: {
                                                    messagingUserToken:
                                                        props.token,
                                                    threadId: props.thread.id,
                                                    messageId,
                                                },
                                            })
                                    );
                                }}
                            </Mutation>
                        )}
                    </Mutation>
                </Content>
            );
        }}
    </Query>
);
