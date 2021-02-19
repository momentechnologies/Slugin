import React from 'react';
import { withRouter } from 'react-router-dom';

import Reply from './Reply';
import Button from '../../../../components/Button';

import styles from './replies.module.scss';

const RepliesList = ({ replies, selectedReply, location, baseUrl }) => {
    return (
        <div className={styles.replies}>
            <div className={styles.title}>Chat bot Replies</div>
            <div className={styles.actions}>
                <Button to={`${baseUrl}/new`}>Add new</Button>
            </div>
            <div className={styles.replyList}>
                {replies.length === 0 ? (
                    <div className={styles.noConversations}>
                        No chat bot replies
                    </div>
                ) : null}
                {replies
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .map(reply => (
                        <Reply
                            key={reply.id}
                            reply={reply}
                            isSelected={reply.id === selectedReply}
                        />
                    ))}
            </div>
        </div>
    );
};

export default withRouter(RepliesList);
