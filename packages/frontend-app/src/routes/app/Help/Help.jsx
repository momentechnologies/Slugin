import React from 'react';
import {
    Col,
    Container,
    Jumbotron,
    Row,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import { Link, Redirect, Route } from 'react-router-dom';
import FAQ from './pages/FAQ';
import GetStarted from '../settings/Setup';

export default props => (
    <Container className="mt-3" fluid>
        <Row>
            <Col>
                <Jumbotron>
                    <h2 className="display-3">Documentation</h2>
                    <p className="lead">Slugin documentation</p>
                    <p>Find the answers to your questions.</p>
                </Jumbotron>
            </Col>
        </Row>
        <Row>
            <Col md={2}>
                <ListGroup>
                    <ListGroupItem
                        tag={Link}
                        to={`${props.match.url}/get-started`}
                        disabled={
                            props.location.pathname ===
                            `${props.match.url}/get-started`
                        }
                    >
                        Get started
                    </ListGroupItem>
                    <ListGroupItem
                        tag={Link}
                        to={`${props.match.url}/faq`}
                        disabled={
                            props.location.pathname === `${props.match.url}/faq`
                        }
                    >
                        FAQ
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col>
                <Route
                    path={props.match.path + '/get-started'}
                    render={ownProps => (
                        <GetStarted {...ownProps} withContainer={false} />
                    )}
                />
                <Route path={props.match.path + '/faq'} component={FAQ} />
                <Redirect to={props.match.url + '/get-started'} />
            </Col>
        </Row>
    </Container>
);
