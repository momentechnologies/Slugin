import React from 'react';
import moment from 'moment';

import styles from './threadList.module.css';

export default ({ thread, organizationName, onClick }) => (
    <div className={styles.listItem} onClick={onClick}>
        <div className={styles.listItemMeta}>
            <div>{organizationName}</div>
            <div>{moment.unix(thread.createdAt).format('D. MMM YY')}</div>
        </div>
        <div className={styles.lastMessage}>
            {thread.lastMessage
                ? `${thread.lastMessage.isFromClient ? 'You: ' : ''} ${
                      thread.lastMessage.message
                  }`
                : null}
        </div>
    </div>
);
