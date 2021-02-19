import React from 'react';
import { withRouter } from 'react-router-dom';
import cn from 'classnames';
import styles from './reply.module.scss';

const Reply = ({ reply, isSelected, history, match }) => (
    <div
        key={reply.id}
        className={cn('p-2', styles.reply, {
            [styles.active]: isSelected,
        })}
        onClick={() => history.push(`${match.url}/${reply.id}`)}
    >
        <div>{reply.title}</div>
        <div className={styles.lastMessage}>{reply.replyText}</div>
    </div>
);

export default withRouter(Reply);
