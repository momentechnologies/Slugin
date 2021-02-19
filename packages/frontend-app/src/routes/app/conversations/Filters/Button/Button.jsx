import React from 'react';
import cn from 'classnames';
import styles from './button.module.scss';

export default ({ children, color = 'white', selected = false, onClick }) => (
    <div
        className={cn(styles.button, styles[`button-` + color], {
            [styles.selected]: selected,
        })}
        onClick={onClick}
    >
        {children}
    </div>
);
