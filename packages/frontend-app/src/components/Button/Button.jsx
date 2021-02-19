import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './button.module.scss';

export default ({ color = 'main', size = 'normal', ...otherProps }) => {
    return React.createElement(otherProps.to ? Link : 'div', {
        className: cn(styles.button, styles[`button-${color}`], styles[size]),
        ...otherProps,
    });
};
