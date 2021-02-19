import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Storage from '../../helpers/storage';
import MessagingUserSubscriptions from './MessagingUserSubscriptions';
import MessagingUser from './MessagingUser';

export default ({ clientInfo, ...props }) => {
    const [forceRefreshClientInfo, setForceRefreshClientInfo] = React.useState(
        false
    );
    const [clientInfoState, setClientInfoState] = React.useState(null);
    const [currentToken, setCurrentToken] = React.useState(
        Storage.get('slugin_MessagingUserToken')
    );
    let clientInfoLocal = clientInfoState || clientInfo;

    if (!clientInfoLocal) {
        const storedClientInfo = Storage.get('slugin_ClientInfo');
        clientInfoLocal = storedClientInfo
            ? JSON.parse(storedClientInfo)
            : null;
    } else {
        Storage.set('slugin_ClientInfo', JSON.stringify(clientInfoLocal));
    }

    return (
        <Mutation
            mutation={gql`
                mutation CreateMessagingUserToken(
                    $messagingUserInfo: MessagingUserInfo!
                ) {
                    createMessagingUserToken(
                        messagingUserInfo: $messagingUserInfo
                    )
                }
            `}
            variables={{
                messagingUserInfo: {
                    oldToken: Storage.get('slugin_MessagingUserToken'),
                    organizationKey: props.organizationKey,
                    ...clientInfoLocal,
                },
            }}
        >
            {createMessagingUserToken => {
                if (!clientInfoLocal || forceRefreshClientInfo) {
                    return props.children(null, clientInfoState =>
                        createMessagingUserToken({
                            variables: {
                                messagingUserInfo: {
                                    organizationKey: props.organizationKey,
                                    ...clientInfoState,
                                },
                            },
                        }).then(response => {
                            Storage.set(
                                'slugin_ClientInfo',
                                JSON.stringify(clientInfoState)
                            );
                            Storage.set(
                                'slugin_MessagingUserToken',
                                response.data.createMessagingUserToken
                            );
                            setClientInfoState(clientInfoState);
                            setCurrentToken(
                                response.data.createMessagingUserToken
                            );
                            setForceRefreshClientInfo(false);
                        })
                    );
                }

                return (
                    <MessagingUser
                        messagingUserToken={currentToken}
                        createMessagingUserToken={() =>
                            createMessagingUserToken({
                                variables: {
                                    messagingUserInfo: {
                                        organizationKey: props.organizationKey,
                                        ...clientInfoLocal,
                                    },
                                },
                            })
                                .then(response => {
                                    Storage.set(
                                        'slugin_MessagingUserToken',
                                        response.data.createMessagingUserToken
                                    );
                                    setCurrentToken(
                                        response.data.createMessagingUserToken
                                    );
                                })
                                .catch(() => {
                                    setForceRefreshClientInfo(true);
                                })
                        }
                        children={props.children}
                    >
                        {() => (
                            <MessagingUserSubscriptions
                                messagingUserToken={currentToken}
                                organizationKey={props.organizationKey}
                                onNewMessage={props.onNewMessage}
                            >
                                {() => props.children(currentToken, null)}
                            </MessagingUserSubscriptions>
                        )}
                    </MessagingUser>
                );
            }}
        </Mutation>
    );
};
