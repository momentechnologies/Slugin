import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Alert } from 'reactstrap';
import Loader from '../../../../components/Loader';
import ConversationLine from '../ConversationLine';
import Input from './Input';
import Bar from './Bar';
import styles from './conversation.module.scss';

class Conversation extends Component {
    state = { message: '' };

    onSend = () => {
        if (this.state.message.length === 0) {
            return;
        }

        this.props.onNewMessage(this.state.message).then(() => {
            this.setState({
                message: '',
            });
            this.scrollToBottom();
        });
    };

    scrollToBottom = () => {
        this.messages.scrollTop =
            this.messages.scrollHeight - this.messages.clientHeight;
    };

    render() {
        if (this.props.loading) {
            return <Loader />;
        }

        if (this.props.error) {
            return <Alert color="danger">Noe skjedde</Alert>;
        }

        return (
            <div className={styles.conversationWrapper}>
                <Bar thread={this.props.thread} />
                <div className={styles.conversation}>
                    <div className={styles.messagesWrapper}>
                        <div
                            className={styles.messages}
                            ref={e => {
                                this.messages = e;
                            }}
                        >
                            {this.props.messages.map(m => (
                                <ConversationLine
                                    key={m.id}
                                    isMessageFromClient={m.isFromClient}
                                >
                                    {m.message}
                                </ConversationLine>
                            ))}
                        </div>
                        <Input>
                            <input
                                placeholder={'Write your message here'}
                                type="text"
                                autoFocus={true}
                                value={this.state.message}
                                onChange={e =>
                                    this.setState({
                                        message: e.target.value,
                                    })
                                }
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        this.onSend();
                                    }
                                }}
                            />
                        </Input>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Conversation);
