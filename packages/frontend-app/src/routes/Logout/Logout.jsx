import React from 'react';
import { Container, Col, Row, Alert } from 'reactstrap';

import Loader from '../../components/Loader';

export default ({ error, logout }) => {
    React.useEffect(() => {
        logout();
    }, []);

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    {error ? <Alert color="danger">{error}</Alert> : <Loader />}
                </Col>
            </Row>
        </Container>
    );
};
