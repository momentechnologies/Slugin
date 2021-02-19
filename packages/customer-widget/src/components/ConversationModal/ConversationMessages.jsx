import React, { Component } from 'react';

import ConversationLine from './components/ConversationLine';
import Input from './components/Input';

import styles from './conversationModal.module.css';

class ConversationMessages extends Component {
    state = { updateOnFocus: false };

    componentDidMount() {
        this.checkUpdate();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.messages !== this.props.messages) {
            if (this.messages) {
                this.messages.scrollTop =
                    this.messages.scrollHeight - this.messages.clientHeight;
            }
            this.checkUpdate();
        }

        if (this.state.updateOnFocus && this.props.windowHasFocus) {
            this.props.onUpdateLastSeen(...this.state.updateOnFocus);

            this.setState({
                updateOnFocus: false,
            });
        }
    }

    checkUpdate() {
        if (
            this.props.messages.length > 0 &&
            this.props.messages[this.props.messages.length - 1]
        ) {
            const lastMessage = this.props.messages[
                this.props.messages.length - 1
            ];

            console.log(lastMessage);
            if (!lastMessage.clientSeen) {
                if (this.props.windowHasFocus) {
                    this.props.onUpdateLastSeen(lastMessage.id);
                } else {
                    this.setState({
                        updateOnFocus: [lastMessage.id],
                    });
                }
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className={styles.content}
                    ref={el => {
                        this.messages = el;
                    }}
                >
                    {this.props.initialMessages.map((m, i) => (
                        <ConversationLine key={i} isMessageFromMe={false}>
                            {m.message}
                        </ConversationLine>
                    ))}
                    {this.props.messages.map((m, i) => (
                        <ConversationLine
                            key={i}
                            isMessageFromMe={m.isFromClient}
                        >
                            {m.message}
                        </ConversationLine>
                    ))}
                </div>
                <Input
                    theme={this.props.theme}
                    onNewMessage={message => this.props.onNewMessage(message)}
                />
            </React.Fragment>
        );
    }
}

export default ConversationMessages;
