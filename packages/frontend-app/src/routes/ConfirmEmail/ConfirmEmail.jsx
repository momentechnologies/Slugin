import React from 'react';
import { Container, Col, Row, Alert } from 'reactstrap';

import Loader from '../../components/Loader';

export default props => {
    React.useEffect(() => {
        props.confirmUser();
    }, []);

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    {props.error ? (
                        <Alert color="danger">{props.error}</Alert>
                    ) : (
                        <Loader />
                    )}
                </Col>
            </Row>
        </Container>
    );
};
