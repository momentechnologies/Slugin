import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import MeHoc from '../../../../hComponents/Me';
import Organizations from './Organizations';

const CREATE_ORGANIZATION = gql`
    mutation CreateOrganization($name: String!) {
        createOrganization(name: $name) {
            id
        }
    }
`;

const OrganizationsContainer = ({ refetchMe, ...props }) => {
    return (
        <Mutation mutation={CREATE_ORGANIZATION}>
            {createOrganization => (
                <Organizations
                    {...props}
                    createOrganization={name =>
                        createOrganization({
                            variables: {
                                name,
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

export default MeHoc()(OrganizationsContainer);
