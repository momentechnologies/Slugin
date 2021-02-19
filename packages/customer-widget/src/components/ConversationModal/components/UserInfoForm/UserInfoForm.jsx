import React from 'react';
import Header from '../Header';
import Button from '../../../../components/Button';
import getGraphqlError from '../../../../helpers/getGraphqlError';
import styles from './userInfoForm.module.css';

export default ({ onNewUserInfo, onClose, ...props }) => {
    const [error, setError] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({ name: '', email: '' });
    return (
        <div className={styles.wrapper}>
            <Header
                organization={props.organization}
                theme={props.theme}
                onClose={onClose}
            />
            <div className={styles.form}>
                <p>
                    Please fill in your information to start chatting with us.
                </p>
                <div className={styles.inputGroup}>
                    <div>Name</div>
                    <input
                        type="text"
                        value={userInfo.name}
                        onChange={e =>
                            setUserInfo({
                                ...userInfo,
                                name: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={styles.inputGroup}>
                    <div>Email</div>
                    <input
                        type="email"
                        value={userInfo.email}
                        onChange={e =>
                            setUserInfo({
                                ...userInfo,
                                email: e.target.value,
                            })
                        }
                    />
                </div>
                {error ? <div>{error}</div> : null}
            </div>
            <div className={styles.buttonContainer}>
                <Button
                    onClick={() =>
                        onNewUserInfo(userInfo).catch(e => {
                            const error = getGraphqlError(e);
                            if (error.error.errors) {
                                setError(
                                    <ul>
                                        {error.error.errors.map(e => (
                                            <li>{e.message}</li>
                                        ))}
                                    </ul>
                                );
                            } else {
                                setError('something');
                            }
                        })
                    }
                    color={props.theme.color}
                >
                    Start chatting
                </Button>
            </div>
        </div>
    );
};
