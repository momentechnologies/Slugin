import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

import Notifications from './Notifications';
import MeHoc from '../../../../hComponents/Me';

const UPDATE_SETTING = gql`
    mutation updateOrganizationUserNotification(
        $organizationId: Int!
        $userId: Int!
        $settings: [updateOrganizationUserNotification]!
    ) {
        updateOrganizationUserNotification(
            organizationId: $organizationId
            userId: $userId
            settings: $settings
        ) {
            id
            notificationName
            notificationType
            canSend
        }
    }
`;

const GET_USER_ORGANIZATION_NOTIFICATION = gql`
    query OrganizationUserNotificationSettings(
        $organizationId: Int!
        $userId: Int!
    ) {
        organizationUser(organizationId: $organizationId, userId: $userId) {
            notifications {
                id
                notificationName
                notificationType
                canSend
            }
        }
    }
`;

const NotificationsContainer = props => (
    <Query
        query={GET_USER_ORGANIZATION_NOTIFICATION}
        variables={{
            organizationId: props.selectedOrganization.id,
            userId: props.me.id,
        }}
    >
        {({ loading, error, data }) => (
            <Mutation
                mutation={UPDATE_SETTING}
                update={(
                    cache,
                    { data: { updateOrganizationUserNotification } }
                ) => {
                    const { organizationUser } = cache.readQuery({
                        query: GET_USER_ORGANIZATION_NOTIFICATION,
                        variables: {
                            organizationId: props.selectedOrganization.id,
                            userId: props.me.id,
                        },
                    });

                    let newNotifications = [...organizationUser.notifications];

                    updateOrganizationUserNotification.forEach(uos => {
                        const index = newNotifications.findIndex(
                            os =>
                                os.notificationType === uos.notificationType &&
                                os.notificationName === uos.notificationName
                        );

                        if (index === -1) {
                            newNotifications.push(uos);
                        } else {
                            newNotifications = newNotifications.map(s =>
                                s.notificationType === uos.notificationType &&
                                s.notificationName === uos.notificationName
                                    ? uos
                                    : s
                            );
                        }
                    });

                    cache.writeQuery({
                        query: GET_USER_ORGANIZATION_NOTIFICATION,
                        data: {
                            organizationUser: {
                                ...organizationUser,
                                notifications: newNotifications,
                            },
                        },
                        variables: {
                            organizationId: props.selectedOrganization.id,
                            userId: props.me.id,
                        },
                    });
                }}
            >
                {updateOrganizationUserNotification => (
                    <Notifications
                        {...props}
                        loading={loading}
                        error={error}
                        notifications={
                            data && data.organizationUser
                                ? data.organizationUser.notifications
                                : []
                        }
                        updateNotifications={settings =>
                            updateOrganizationUserNotification({
                                variables: {
                                    organizationId:
                                        props.selectedOrganization.id,
                                    userId: props.me.id,
                                    settings,
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

NotificationsContainer.defaultProps = {
    onSaveDone: () => {},
};

export default MeHoc()(NotificationsContainer);
