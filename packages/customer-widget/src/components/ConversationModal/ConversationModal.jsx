import React from 'react';

import Header from './components/Header';
import ThreadList from './components/ThreadList';
import ConversationMessages from './ConversationMessages';
import ThreadMessagesContainer from './components/ThreadMessagesContainer';

export default props => {
    const [showMessages, setShowMessages] = React.useState(false);
    const [threadId, setThreadId] = React.useState(null);

    // Thread list page
    if (!showMessages) {
        return (
            <React.Fragment>
                <Header
                    organization={props.organization}
                    theme={props.theme}
                    onClose={props.onClose}
                />
                <ThreadList
                    theme={props.theme}
                    threads={props.threads}
                    organization={props.organization}
                    openConversation={threadId => {
                        setShowMessages(true);
                        setThreadId(threadId);
                    }}
                />
            </React.Fragment>
        );
    }

    const thread = threadId ? props.threads.find(t => t.id === threadId) : null;

    return (
        <React.Fragment>
            <Header
                organization={props.organization}
                theme={props.theme}
                onBack={() => setShowMessages(false)}
                onClose={props.onClose}
            />
            {thread ? (
                <ThreadMessagesContainer token={props.token} thread={thread}>
                    {(messages, newMessage, onUpdateLastSeen) => (
                        <ConversationMessages
                            theme={props.theme}
                            messages={messages}
                            thread={thread}
                            threadClosed={!!thread.endedAt}
                            onNewMessage={message => newMessage(message)}
                            initialMessages={props.organization.initialMessages}
                            onUpdateLastSeen={onUpdateLastSeen}
                            windowHasFocus={props.windowHasFocus}
                        />
                    )}
                </ThreadMessagesContainer>
            ) : (
                <ConversationMessages
                    theme={props.theme}
                    messages={[]}
                    thread={null}
                    threadClosed={false}
                    onNewMessage={message =>
                        props
                            .onNewThread(message)
                            .then(thread => setThreadId(thread.id))
                    }
                    initialMessages={props.organization.initialMessages}
                />
            )}
        </React.Fragment>
    );
};
