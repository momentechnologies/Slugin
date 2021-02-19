import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import helpers from '../../../../helpers/helpers';

import Conversation from './Conversation';

const NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription newMessage($threadId: Int!) {
        newMessage(threadId: $threadId) {
            id
            threadId
            isFromClient
            message
            date
        }
    }
`;

const NEW_MESSAGE = gql`
    mutation newMessage($threadId: Int!, $message: String!) {
        newMessage(threadId: $threadId, message: $message) {
            id
            threadId
            isFromClient
            message
            date
        }
    }
`;

const GET_THREAD_MESSAGES = gql`
    query ThreadMessages($threadId: Int!) {
        messages(threadId: $threadId) {
            id
            threadId
            isFromClient
            message
            date
        }
    }
`;

const Content = ({ children, subscribe, threadId }) => {
    React.useEffect(() => {
        subscribe();
    }, [threadId]);

    return children;
};

const ConversationFetcher = props => (
    <Query
        query={GET_THREAD_MESSAGES}
        variables={{
            threadId: props.thread.id,
        }}
        fetchPolicy="network-only"
    >
        {({ loading, error, data, subscribeToMore }) => (
            <Mutation
                mutation={NEW_MESSAGE}
                update={(cache, { data: { newMessage } }) => {
                    const { messages } = cache.readQuery({
                        query: GET_THREAD_MESSAGES,
                        variables: {
                            threadId: props.thread.id,
                        },
                    });
                    cache.writeQuery({
                        query: GET_THREAD_MESSAGES,
                        data: { messages: messages.concat([newMessage]) },
                        variables: {
                            threadId: props.thread.id,
                        },
                    });
                }}
            >
                {newMessage => (
                    <Content
                        threadId={props.thread.id}
                        subscribe={() =>
                            subscribeToMore({
                                document: NEW_MESSAGE_SUBSCRIPTION,
                                variables: {
                                    threadId: props.thread.id,
                                },
                                updateQuery: (prev, { subscriptionData }) => {
                                    if (!subscriptionData.data) return prev;

                                    const newMessage =
                                        subscriptionData.data.newMessage;

                                    return {
                                        ...prev,
                                        messages: helpers.arrayAddOrUpdate(
                                            prev.messages,
                                            { id: newMessage.id },
                                            newMessage
                                        ),
                                    };
                                },
                            })
                        }
                    >
                        <Conversation
                            {...props}
                            loading={loading}
                            error={error}
                            messages={data ? data.messages : []}
                            onNewMessage={message =>
                                newMessage({
                                    variables: {
                                        message,
                                        threadId: props.thread.id,
                                    },
                                })
                            }
                        />
                    </Content>
                )}
            </Mutation>
        )}
    </Query>
);

export default withRouter(
    connect(state => ({
        organizationId: state.organization.selectedOrganization,
    }))(ConversationFetcher)
);
