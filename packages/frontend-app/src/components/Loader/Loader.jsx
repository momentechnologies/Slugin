import React from 'react';

import styles from './loader.module.scss';

export default ({ size = 60 }) => (
    <div
        className={styles.loader}
        style={{
            height: size,
            width: size,
            borderWidth: size / 5,
        }}
    />
);
