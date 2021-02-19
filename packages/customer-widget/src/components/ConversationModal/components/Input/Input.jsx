import React, { Component } from 'react';

import styles from './input.module.css';

class Input extends Component {
    state = {
        message: '',
    };
    onSend() {
        if (this.state.message.length === 0) {
            return;
        }

        this.props.onNewMessage(this.state.message);

        this.setState({
            message: '',
        });
    }
    render() {
        return (
            <div className={styles.input}>
                <div className={styles.inputWrapper}>
                    <pre style={{ visibility: 'hidden' }}>
                        {this.state.message}
                        <br />
                    </pre>
                    <textarea
                        placeholder="Your message here"
                        value={this.state.message}
                        onChange={e =>
                            this.setState({ message: e.target.value })
                        }
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                this.onSend();
                                e.stopPropagation();
                                e.preventDefault();
                            }
                        }}
                        autoFocus={true}
                    />
                </div>
                <div
                    className={styles.send}
                    onClick={this.onSend.bind(this)}
                    style={{ backgroundColor: this.props.theme.color }}
                >
                    <div>Send</div>
                </div>
            </div>
        );
    }
}

export default Input;
