import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ConfirmEmail from './ConfirmEmail';
import ConfirmEmailPassword from './ConfirmEmailPassword';
import queryString from 'query-string';
import jwt from 'jsonwebtoken';
import { Alert } from 'reactstrap';

const CONFIRM_USER = gql`
    mutation ConfirmUser(
        $token: String!
        $firstName: String
        $lastName: String
        $password: String
    ) {
        confirmUser(
            token: $token
            firstName: $firstName
            lastName: $lastName
            password: $password
        ) {
            error {
                message
            }
            userId
        }
    }
`;

const ConfirmEmailContainer = () => {
    const info = React.useMemo(() => {
        const query = queryString.parse(location.search); //eslint-disable-line

        if (!query.token) {
            return {
                error: 'No token was found in the url',
            };
        }

        return {
            token: query.token,
            user: jwt.decode(query.token).payload.user,
        };
    }, []);

    if (info.error) {
        return <Alert color="danger">{info.error}</Alert>;
    }

    return (
        <Mutation mutation={CONFIRM_USER}>
            {(confirmUser, { loading, error, data }) => {
                const errorString = error
                    ? 'Something happened'
                    : data && data.confirmUser.error
                    ? data.confirmUser.error.message
                    : false;

                if (info.user.password) {
                    return (
                        <ConfirmEmail
                            confirmUser={() =>
                                confirmUser({
                                    variables: {
                                        token: info.token,
                                    },
                                }).then(data => {
                                    if (!data.data.confirmUser.error) {
                                        window.location.replace('/app');
                                    }
                                })
                            }
                            loading={loading}
                            error={errorString}
                        />
                    );
                }

                return (
                    <ConfirmEmailPassword
                        confirmUser={variables =>
                            confirmUser({
                                variables: {
                                    ...variables,
                                    token: info.token,
                                },
                            }).then(data => {
                                if (!data.data.confirmUser.error) {
                                    window.location.replace('/app');
                                }
                            })
                        }
                        error={errorString}
                    />
                );
            }}
        </Mutation>
    );
};

export default ConfirmEmailContainer;
