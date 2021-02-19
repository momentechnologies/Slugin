import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'reactstrap';

const CLOSE_THREAD = gql`
    mutation CloseThread($threadId: Int!) {
        closeThread(threadId: $threadId) {
            id
            endedAt
        }
    }
`;

const CloseButton = ({ thread }) => (
    <Mutation mutation={CLOSE_THREAD}>
        {closeThread => {
            if (thread.endedAt) {
                return <span>Closed</span>;
            } else {
                return (
                    <Button
                        onClick={() =>
                            closeThread({
                                variables: {
                                    threadId: thread.id,
                                },
                            })
                        }
                    >
                        Close
                    </Button>
                );
            }
        }}
    </Mutation>
);

CloseButton.propTypes = {
    thread: PropTypes.object.isRequired,
};

export default CloseButton;
