import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import EditReply from './EditReply';
import MeContext from '../../../../contexts/meContext';
import { GET_ORGANIZATION_BOT_REPLIES } from '../../../../queries/botReplies';

const ADD_OR_UPDATE_REPLY = gql`
    mutation AddOrUpdateBotReply(
        $id: Int
        $organizationId: Int!
        $title: String!
        $reply: String!
        $triggers: [String]!
    ) {
        addOrUpdateBotReply(
            id: $id
            organizationId: $organizationId
            title: $title
            reply: $reply
            triggers: $triggers
        ) {
            id
            title
            replyText
            createdAt
            triggers {
                id
                sentence
            }
        }
    }
`;

const LoginContainer = props => {
    return (
        <MeContext.Consumer>
            {({ state, getSelectedOrganization }) => {
                const organizationId = getSelectedOrganization(props.location)
                    .id;

                return (
                    <Mutation
                        mutation={ADD_OR_UPDATE_REPLY}
                        update={(cache, { data: { addOrUpdateBotReply } }) => {
                            const { organization } = cache.readQuery({
                                query: GET_ORGANIZATION_BOT_REPLIES,
                                variables: {
                                    organizationId,
                                },
                            });

                            if (props.reply) {
                                organization.botReplies.map(br =>
                                    br.id === addOrUpdateBotReply.id
                                        ? addOrUpdateBotReply
                                        : br
                                );
                            } else {
                                organization.botReplies.push(
                                    addOrUpdateBotReply
                                );
                            }

                            cache.writeQuery({
                                query: GET_ORGANIZATION_BOT_REPLIES,
                                data: { organization },
                                variables: {
                                    organizationId,
                                },
                            });
                        }}
                    >
                        {(updateOrCreate, { loading, error }) => {
                            const errorString = error
                                ? 'Something happened'
                                : false;

                            return (
                                <EditReply
                                    {...props}
                                    updateOrCreate={variables =>
                                        updateOrCreate({
                                            variables: {
                                                ...variables,
                                                id: props.reply
                                                    ? props.reply.id
                                                    : undefined,
                                                organizationId,
                                            },
                                        }).then(data => {
                                            if (!props.reply) {
                                                props.history.push(
                                                    `${props.baseUrl}/${
                                                        data.data
                                                            .addOrUpdateBotReply
                                                            .id
                                                    }`
                                                );
                                            }
                                        })
                                    }
                                    error={errorString}
                                />
                            );
                        }}
                    </Mutation>
                );
            }}
        </MeContext.Consumer>
    );
};

export default LoginContainer;
