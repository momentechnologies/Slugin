import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import MeHoc from '../../hComponents/Me';

import styles from './footer.module.scss';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <Container>
                <Row>
                    <Col>
                        <Link to={'/tp'} className="text-white">
                            Terms and policies
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MeHoc()(withRouter(Footer));
