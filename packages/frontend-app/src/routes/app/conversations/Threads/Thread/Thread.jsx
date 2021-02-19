import React from 'react';
import { withRouter } from 'react-router-dom';
import cn from 'classnames';
import styles from './thread.module.scss';

const getThreadStatus = thread => {
    if (thread.endedAt) {
        return 'done';
    }

    if (thread.assignedUserId) {
        return 'ongoing';
    }

    return 'new';
};

const Thread = ({ thread, isSelected, history, match }) => (
    <div
        key={thread.id}
        className={cn(
            'p-2',
            styles.thread,
            styles[`thread-${getThreadStatus(thread)}`],
            {
                [styles.active]: isSelected,
            }
        )}
        onClick={() => history.push(`${match.url}/${thread.id}`)}
    >
        <div>{thread.messagingUser.name}</div>
        <div className={styles.lastMessage}>
            {thread.lastMessage ? thread.lastMessage.message : null}
        </div>
    </div>
);

export default withRouter(Thread);
