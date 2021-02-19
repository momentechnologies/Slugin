import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import MeHoc from '../../../../hComponents/Me';
import Users from './Users';

const NEW_USER = gql`
    mutation InviteUserToOrganization($organizationId: Int!, $email: String!) {
        inviteUserToOrganization(organizationId: $organizationId, email: $email)
    }
`;

const UsersContainer = ({ selectedOrganization, refetchMe }) => {
    return (
        <Mutation mutation={NEW_USER}>
            {inviteUserToOrganization => (
                <Users
                    selectedOrganization={selectedOrganization}
                    invite={email =>
                        inviteUserToOrganization({
                            variables: {
                                organizationId: selectedOrganization.id,
                                email,
                            },
                        }).then(data => {
                            console.log(data);
                            refetchMe();
                        })
                    }
                />
            )}
        </Mutation>
    );
};

export default MeHoc()(UsersContainer);
