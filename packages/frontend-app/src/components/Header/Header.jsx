import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import MeHoc from '../../hComponents/Me';
import Logo from '../Logo';

import styles from './header.module.scss';

const Header = props => {
    return (
        <div className={styles.header}>
            <Container>
                <Row>
                    <Col className={styles.link}>
                        <Link to={'/#qa'}>Q&A</Link>
                    </Col>
                    <Col className={styles.link}>
                        <Link to={'/'} style={{ marginTop: -10 }}>
                            <Logo size={50} />
                        </Link>
                    </Col>
                    <Col className={styles.link}>
                        {props.isAuthenticated ? (
                            <Link to={'/app'}>Go to app</Link>
                        ) : (
                            <div>
                                <Link to="/register">Sign up</Link> /{' '}
                                <Link to="/login">Login</Link>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MeHoc()(withRouter(Header));
