import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import fbq from '../../helpers/fbq';
import getGraphqlError from '../../helpers/getGraphqlError';

import Register from './Register';

const CREATE_NEW_USER = gql`
    mutation CreateNewUser(
        $organizationName: String
        $email: String
        $firstName: String
        $lastName: String
        $password: String
        $newsletterText: String
    ) {
        createNewUser(
            organizationName: $organizationName
            email: $email
            firstName: $firstName
            lastName: $lastName
            password: $password
            newsletterText: $newsletterText
        ) {
            id
        }
    }
`;

const ConfirmEmailContainer = () => (
    <Mutation mutation={CREATE_NEW_USER}>
        {(createNewUser, { loading, error }) => (
            <Register
                createNewUser={variables =>
                    createNewUser({
                        variables,
                    })
                        .then(data => {
                            if (!data.data.createNewUser.error) {
                                fbq('track', 'CompleteRegistration');
                                window.dataLayer.push({
                                    event: 'GAEvent',
                                    eventCategory: 'Checkout',
                                    eventAction: 'Done',
                                });
                                window.location.replace('/app');
                            }
                        })
                        .catch(() => console.error('Register request failed'))
                }
                error={error && getGraphqlError(error)}
                loading={loading}
            />
        )}
    </Mutation>
);

export default ConfirmEmailContainer;
