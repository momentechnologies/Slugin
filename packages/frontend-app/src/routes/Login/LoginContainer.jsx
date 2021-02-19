import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Login from './Login';
import getGraphqlError from '../../helpers/getGraphqlError';

const LOGIN = gql`
    mutation Login($email: String, $password: String) {
        login(email: $email, password: $password)
    }
`;

const LoginContainer = () => (
    <Mutation mutation={LOGIN}>
        {(login, { loading, error }) => {
            return (
                <Login
                    login={variables =>
                        login({
                            variables,
                        })
                            .then(data => {
                                if (!data.data.login.error) {
                                    window.location.replace('/app');
                                }
                            })
                            .catch(() => {})
                    }
                    error={error && getGraphqlError(error)}
                    loading={loading}
                />
            );
        }}
    </Mutation>
);

export default LoginContainer;
