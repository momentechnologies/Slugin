import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PersonIcon from '../../../../components/PersonIcon';
import SettingsIcon from './SettingsIcon';
import LogoutIcon from './LogoutIcon';
import Logo from '../../../../components/Logo';
import styles from './header.module.scss';

const Header = ({ children, baseUrl, history }) => (
    <div className={styles.page}>
        <div className={styles.sidebar}>
            <div>
                <div className={styles.icon}>
                    <Link to={`${baseUrl}/me`}>
                        <PersonIcon />
                    </Link>
                </div>
                <div className={styles.links}>
                    <div
                        className={styles.linkIcon}
                        onClick={() => history.push(`${baseUrl}`)}
                    >
                        <Logo color="#ffffff" size={30} />
                    </div>
                    <div
                        className={styles.linkIcon}
                        onClick={() => history.push(`${baseUrl}/settings`)}
                    >
                        <SettingsIcon />
                    </div>
                    <div
                        className={styles.linkIcon}
                        onClick={() => history.push(`/logout`)}
                    >
                        <LogoutIcon />
                    </div>
                </div>
            </div>
            <div>
                <div className={styles.linkIcon}>
                    <Link
                        className="text-white text-center"
                        to={baseUrl + '/help'}
                    >
                        <div
                            className="fa fa-book"
                            style={{ fontSize: '1.5em' }}
                        />
                    </Link>
                </div>
                <div className={styles.linkIcon}>
                    <Link
                        className="text-white text-center"
                        to={baseUrl + '/whats-new'}
                    >
                        <div
                            className="fa fa-bullhorn"
                            style={{ fontSize: '1.5em' }}
                        />
                    </Link>
                </div>
                <div className={styles.linkIcon}>
                    <Link className="p-3" to={baseUrl}>
                        <Logo size={40} />
                    </Link>
                </div>
            </div>
        </div>
        <div className={styles.content}>{children}</div>
    </div>
);

export default withRouter(Header);
