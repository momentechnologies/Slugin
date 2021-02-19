import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Root from './Root';
import MessagingUserContainer from './components/MessagingUserContainer';

const NEW_PAGE_VIEW = gql`
    mutation NewPageView($path: String!, $organizationKey: String!) {
        newPageView(path: $path, organizationKey: $organizationKey)
    }
`;

export default props => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [newMessage, setNewMessage] = React.useState(null);

    return (
        <Mutation mutation={NEW_PAGE_VIEW}>
            {newPageView => (
                <MessagingUserContainer
                    organizationKey={props.organization.organizationKey}
                    clientInfo={props.clientInfo}
                    onNewMessage={message => setNewMessage(message)}
                >
                    {(token, onNewUserInfo) => (
                        <Root
                            {...props}
                            token={token}
                            onNewUserInfo={onNewUserInfo}
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            newMessage={newMessage}
                            closeMessage={() => setNewMessage(null)}
                            newPageView={path =>
                                newPageView({
                                    variables: {
                                        path,
                                        organizationKey:
                                            props.organization.organizationKey,
                                    },
                                })
                            }
                        />
                    )}
                </MessagingUserContainer>
            )}
        </Mutation>
    );
};
