import React from 'react';
import { withRouter } from 'react-router-dom';

import Thread from './Thread';
import Loader from '../../../../components/Loader';

import styles from './threads.module.scss';

const Threads = ({ threads, selectedThread, loading }) => (
    <div className={styles.threads}>
        <div className={styles.title}>Conversations</div>
        <div className={styles.threadList}>
            {loading ? (
                <Loader />
            ) : (
                <React.Fragment>
                    {threads.length === 0 ? (
                        <div className={styles.noConversations}>
                            No conversations
                        </div>
                    ) : null}
                    {threads
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .map(t => (
                            <Thread
                                key={t.id}
                                thread={t}
                                isSelected={t.id === selectedThread}
                            />
                        ))}
                </React.Fragment>
            )}
        </div>
    </div>
);

export default withRouter(Threads);
