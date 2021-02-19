import React from 'react';
import { Query } from 'react-apollo';

import Bot from './Bot';
import MeContext from '../../../contexts/meContext';
import { GET_ORGANIZATION_BOT_REPLIES } from '../../../queries/botReplies';

const RepliesFetcher = props => (
    <MeContext.Consumer>
        {({ state, getSelectedOrganization }) => (
            <Query
                query={GET_ORGANIZATION_BOT_REPLIES}
                variables={{
                    organizationId: getSelectedOrganization(props.location).id,
                }}
            >
                {({ loading, error, data }) => (
                    <Bot
                        {...props}
                        loading={loading}
                        error={error}
                        replies={
                            data &&
                            data.organization &&
                            Array.isArray(data.organization.botReplies)
                                ? data.organization.botReplies
                                : []
                        }
                    />
                )}
            </Query>
        )}
    </MeContext.Consumer>
);

export default RepliesFetcher;
