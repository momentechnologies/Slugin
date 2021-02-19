import React from 'react';

import styles from './header.module.css';

export default ({ onBack, organization, theme, onClose }) => (
    <div className={styles.header} style={{ backgroundColor: theme.color }}>
        {onBack ? (
            <div className={styles.backCursor} onClick={onBack}>
                {'<'}
            </div>
        ) : (
            <div className={styles.backCursor} />
        )}
        <div>{organization.name}</div>
        <div className={styles.close} onClick={onClose}>
            &times;
        </div>
    </div>
);
