import React from 'react';

import styles from './circle.module.scss';

const Circle = ({ size = 400, top = 0, left, right }) => {
    return (
        <div
            className={styles.circle}
            style={{
                width: size,
                height: size,
                top,
                left,
                right,
            }}
        />
    );
};

export default Circle;
