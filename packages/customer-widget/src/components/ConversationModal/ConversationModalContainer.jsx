import React from 'react';
import cn from 'classnames';

import IFrame from '../IFrame';
import ThreadsContainer from './components/ThreadsContainer';
import UserInfoForm from './components/UserInfoForm';
import ConversationModal from './ConversationModal';
import styles from './conversationModal.module.css';

export default props => {
    return (
        <IFrame
            title="conversation_modal"
            style={{
                position: 'fixed',
                zIndex: 2147483000,
                ...(props.fullWindow
                    ? {
                          width: '100vw',
                          height: '100%',
                          top: 0,
                          left: 0,
                      }
                    : {
                          bottom: '100px',
                          right: '10px',
                          width: '400px',
                          height: '600px',
                      }),
            }}
        >
            <div
                className={cn(styles.conversationModal, {
                    [styles.large]: props.fullWindow,
                })}
            >
                {props.onNewUserInfo ? (
                    <UserInfoForm
                        {...props}
                        onNewUserInfo={props.onNewUserInfo}
                    />
                ) : (
                    <ThreadsContainer token={props.token}>
                        {(threads, onNewThread, onUpdateLastSeen) => (
                            <ConversationModal
                                {...props}
                                token={props.token}
                                threads={threads}
                                onNewThread={onNewThread}
                                onUpdateLastSeen={onUpdateLastSeen}
                                windowHasFocus={props.windowHasFocus}
                            />
                        )}
                    </ThreadsContainer>
                )}
            </div>
        </IFrame>
    );
};
