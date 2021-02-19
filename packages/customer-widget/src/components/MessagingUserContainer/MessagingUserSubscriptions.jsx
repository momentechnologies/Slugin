import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription MessagingUserSubscriptions($messagingUserToken: String!) {
        newMessage(messagingUserToken: $messagingUserToken) {
            id
            message
        }
    }
`;

export default ({
    organizationKey,
    messagingUserToken,
    onNewMessage,
    children,
}) => (
    <Subscription
        subscription={NEW_MESSAGE_SUBSCRIPTION}
        variables={{ organizationKey, messagingUserToken }}
        onSubscriptionData={({ subscriptionData }) => {
            onNewMessage(subscriptionData.data.newMessage);
        }}
    >
        {({ data, loading }) => children()}
    </Subscription>
);
