import React from 'react';
import styles from './personIcon.module.css';

export default ({ size = 40, imageUrl = '/images/person.png' }) => (
    <div>
        <div
            className={styles.image}
            style={{
                backgroundImage: `url('${imageUrl}')`,
                width: size,
                height: size,
            }}
        />
    </div>
);
