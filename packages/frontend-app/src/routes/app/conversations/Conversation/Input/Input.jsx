import React from 'react';
import styles from './input.module.scss';

const Input = ({children}) => {
    return (
        <div className={styles.inputWrapper}>
            <div className={styles.input}>
                {children}
            </div>
        </div>
    )
};

export default Input;
