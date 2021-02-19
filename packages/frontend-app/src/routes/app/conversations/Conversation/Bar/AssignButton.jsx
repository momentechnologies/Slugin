import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from 'reactstrap';
import MeHoc from '../../../../../hComponents/Me';

const ASSIGN_THREAD = gql`
    mutation AssignThread($threadId: Int!, $userId: Int) {
        assignThread(threadId: $threadId, userId: $userId) {
            id
            assignedUserId
        }
    }
`;

const AssignButton = props => {
    const [isOpen, setIsOpen] = useState(false);

    let assignedName = 'Unassigned';

    const organizationUsers = props.selectedOrganization.users.map(u => u.user);

    if (organizationUsers.find(u => u.id === props.thread.assignedUserId)) {
        let user = organizationUsers.find(
            u => u.id === props.thread.assignedUserId
        );
        assignedName = `${user.firstName} ${user.lastName}`;
    }

    return (
        <Mutation mutation={ASSIGN_THREAD}>
            {assignThread => (
                <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
                    <DropdownToggle
                        caret
                        color={
                            props.thread.assignedUserId === null
                                ? 'warning'
                                : undefined
                        }
                    >
                        {assignedName}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={() =>
                                assignThread({
                                    variables: {
                                        threadId: props.thread.id,
                                        userId: null,
                                    },
                                })
                            }
                            active={props.thread.assignedUserId === null}
                        >
                            Unassigned
                        </DropdownItem>
                        <DropdownItem divider />
                        {organizationUsers.map(u => (
                            <DropdownItem
                                key={u.id}
                                onClick={() =>
                                    assignThread({
                                        variables: {
                                            threadId: props.thread.id,
                                            userId: u.id,
                                        },
                                    })
                                }
                                active={u.id === props.thread.assignedUserId}
                            >
                                {u.firstName} {u.lastName}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            )}
        </Mutation>
    );
};

AssignButton.propTypes = {
    thread: PropTypes.object.isRequired,
};

export default MeHoc()(AssignButton);
