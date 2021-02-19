import React from 'react';

import IFrame from '../IFrame';

import styles from './newMessageModal.module.css';

export default ({ message, onClose }) => {
    return (
        <IFrame
            title="conversation_modal"
            style={{
                position: 'fixed',
                zIndex: 2147483000,
                bottom: '85px',
                right: '10px',
                width: '200px',
                height: '100px',
            }}
        >
            <div className={styles.newMessageModal}>
                <div className={styles.header}>
                    <div className={styles.close} onClick={onClose}>
                        &times;
                    </div>
                </div>
                <div className={styles.message}>{message.message}</div>
            </div>
        </IFrame>
    );
};
