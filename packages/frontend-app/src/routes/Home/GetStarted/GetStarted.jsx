import React from 'react';

import Bubble from '../Bubble';
import styles from './getStarted.module.scss';

export default () => (
    <Bubble>
        <div className={styles.header}>Easy to get started</div>
        <div className="mt-3">1. Register - No credit card required</div>
        <div>2. Intall - One line of javascript to your website</div>
        <div>3. Start chatting with your customers</div>
    </Bubble>
);
