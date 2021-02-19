import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const Step = ({ name, done, active, children }) => {
    return (
        <Row>
            <Col>
                <Card className="mb-1">
                    <CardHeader className="d-flex justify-content-between">
                        <div className="d-flex flex-column justify-content-center">
                            {name}
                        </div>
                        <div>
                            {done ? (
                                <i className="fa fa-check-circle fa-2x text-success" />
                            ) : (
                                <i className="fa fa-times-circle fa-2x text-danger" />
                            )}
                        </div>
                    </CardHeader>
                    {active ? <CardBody>{children}</CardBody> : null}
                </Card>
            </Col>
        </Row>
    );
};

export default Step;
