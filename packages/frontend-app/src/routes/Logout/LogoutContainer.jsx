import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Logout from './Logout';

const LOGIN = gql`
    mutation Logout {
        logout
    }
`;

const LogoutContainer = () => (
    <Mutation mutation={LOGIN}>
        {(logout, { loading, error, data }) => {
            const errorString = error
                ? 'Something happened'
                : data && data.logout.error
                ? data.logout.error.message
                : false;

            return (
                <Logout
                    logout={variables =>
                        logout({
                            variables,
                        }).then(data => {
                            if (!data.data.logout.error) {
                                window.location.replace('/');
                            }
                        })
                    }
                    error={errorString}
                />
            );
        }}
    </Mutation>
);

export default LogoutContainer;
