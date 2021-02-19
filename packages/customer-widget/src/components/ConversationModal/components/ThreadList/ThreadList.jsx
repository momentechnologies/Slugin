import React from 'react';

import ThreadListItem from './ThreadListItem';
import Button from '../../../Button';

import styles from './threadList.module.css';

export default ({ threads, openConversation, theme, organization }) => (
    <div className={styles.threadListContainer}>
        {threads
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(thread => (
                <ThreadListItem
                    key={thread.id}
                    organizationName={organization.name}
                    thread={thread}
                    onClick={() => openConversation(thread.id)}
                />
            ))}
        <div className={styles.padding} />
        <div className={styles.buttonContainer}>
            <Button onClick={() => openConversation(null)} color={theme.color}>
                New conversation
            </Button>
        </div>
    </div>
);
