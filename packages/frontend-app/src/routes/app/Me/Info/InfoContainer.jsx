import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import MeHoc from '../../../../hComponents/Me';
import Info from './Info';

const UPDATE_MY_INFO = gql`
    mutation UpdateUserInfo(
        $userId: Int!
        $firstName: String!
        $lastName: String!
    ) {
        updateUserInfo(
            userId: $userId
            firstName: $firstName
            lastName: $lastName
        ) {
            id
        }
    }
`;

const InfoContainer = ({ me, refetchMe }) => {
    return (
        <Mutation mutation={UPDATE_MY_INFO}>
            {inviteUserToOrganization => (
                <Info
                    me={me}
                    update={(firstName, lastName) =>
                        inviteUserToOrganization({
                            variables: {
                                userId: me.id,
                                firstName,
                                lastName,
                            },
                        }).then(() => {
                            refetchMe();
                        })
                    }
                />
            )}
        </Mutation>
    );
};

export default MeHoc()(InfoContainer);
