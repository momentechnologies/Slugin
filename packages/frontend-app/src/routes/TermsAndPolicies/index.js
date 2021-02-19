import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap';
import PrivacyPolicy from './PrivacyPolicy';
import CookiePolicy from './CookiePolicy';

export default props => (
    <Container>
        <Row className="mt-3">
            <Col md={3}>
                <ListGroup>
                    <ListGroupItem
                        tag={Link}
                        to={`${props.match.path}/privacy-policy`}
                    >
                        Privacy policy
                    </ListGroupItem>
                    <ListGroupItem
                        tag={Link}
                        to={`${props.match.path}/cookie-policy`}
                    >
                        Cookie policy
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={9}>
                <Switch>
                    <Route
                        path={`${props.match.path}/privacy-policy`}
                        render={() => (
                            <PrivacyPolicy baseUrl={props.match.path} />
                        )}
                    />
                    <Route
                        path={`${props.match.path}/cookie-policy`}
                        render={() => (
                            <CookiePolicy baseUrl={props.match.path} />
                        )}
                    />
                </Switch>
            </Col>
        </Row>
    </Container>
);
