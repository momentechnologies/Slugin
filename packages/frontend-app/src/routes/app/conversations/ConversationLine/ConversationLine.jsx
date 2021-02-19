import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './conversationLine.module.css';

class ConversationLine extends Component {
    render() {
        return (
            <div
                className={cn(styles.conversationLine, {
                    [styles.fromClient]: this.props.isMessageFromClient,
                })}
            >
                <div className={styles.messageContainer}>
                    <div>{this.props.children}</div>
                    <div className={styles.dot} />
                </div>
            </div>
        );
    }
}

ConversationLine.propTypes = {
    isMessageFromClient: PropTypes.bool.isRequired,
    children: PropTypes.string.isRequired,
};

export default ConversationLine;
