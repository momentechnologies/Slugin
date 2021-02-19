import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Linkify from 'react-linkify';

import styles from './conversationLine.module.css';

class ConversationLine extends Component {
    render() {
        return (
            <div
                className={cn(styles.conversationLine, {
                    [styles.fromMe]: this.props.isMessageFromMe,
                })}
            >
                <div>
                    <Linkify properties={{ target: '_top' }}>
                        {this.props.children}
                    </Linkify>
                </div>
            </div>
        );
    }
}

ConversationLine.propTypes = {
    isMessageFromMe: PropTypes.bool.isRequired,
    children: PropTypes.string.isRequired,
};

export default ConversationLine;
