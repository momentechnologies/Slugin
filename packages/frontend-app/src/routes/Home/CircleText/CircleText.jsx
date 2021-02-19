import React from 'react';
import cn from 'classnames';

import styles from './cricleText.module.scss';

const CircleText = ({ children, size = 200, className, color = 'white' }) => {
    return (
        <div
            className={cn(styles.circleText, className, styles[color])}
            style={{
                height: size,
                width: size,
            }}
        >
            <div>
                <div style={{ maxWidth: size / 1.7 }}>{children}</div>
            </div>
        </div>
    );
};

export default CircleText;
