import React from 'react';
import cn from 'classnames';
import styles from './bubble.module.scss';

export default ({ children, color = 'red', inverseTriangle = false }) => (
    <div className={cn(styles.bubble, styles[color])}>
        <div>{children}</div>
        <div
            className={cn(styles.triangle, {
                [styles.inverse]: inverseTriangle,
            })}
        />
    </div>
);
