import React from 'react';

import styles from './button.module.css';

export default ({ children, color, ...otherProps }) => (
    <div
        className={styles.button}
        style={{ backgroundColor: color }}
        {...otherProps}
    >
        {children}
    </div>
);
