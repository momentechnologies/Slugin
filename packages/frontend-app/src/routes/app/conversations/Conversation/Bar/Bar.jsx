import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Container, Row, Col } from 'reactstrap';

import AssignButton from './AssignButton';
import CloseButton from './CloseButton';
import styles from './bar.module.scss';

const Bar = ({ thread }) => {
    return (
        <div className={cn(styles.actionBar)}>
            <Container fluid>
                <Row>
                    <Col className="d-flex">
                        <div className="mr-2 d-flex flex-column justify-content-center">
                            <CloseButton thread={thread} />
                        </div>
                        <AssignButton thread={thread} />
                    </Col>
                    <Col className={styles.name}>
                        {thread.messagingUser.name}
                    </Col>
                    <Col className={styles.email}>
                        {thread.messagingUser.email}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

Bar.propTypes = {
    thread: PropTypes.object.isRequired,
};

export default Bar;
