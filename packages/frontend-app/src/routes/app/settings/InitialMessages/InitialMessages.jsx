import React, { Component } from 'react';

import {
    Container,
    Row,
    Col,
    Jumbotron,
    ListGroup,
    ListGroupItem,
    Form,
    FormGroup,
    Input,
    Button,
    Spinner,
    Alert,
} from 'reactstrap';

import MeHoc from '../../../../hComponents/Me';
import eventToJson from '../../../../helpers/eventToJson';

class InitialMessages extends Component {
    state = {
        initialMessages: [],
    };

    componentDidMount() {
        this.sync();
    }

    componentDidUpdate(prevProps, prevState) {
        this.sync(prevProps);
    }

    sync = prevProps => {
        if (
            (!prevProps ||
                prevProps.initialMessages !== this.props.initialMessages) &&
            this.props.initialMessages
        ) {
            this.setState({
                initialMessages: [...this.props.initialMessages],
            });
        }
    };

    handleSubmit = e => {
        this.props.updateInitialMessages(this.state.initialMessages);

        e.preventDefault();
        e.stopPropagation();
    };

    onAddMessage = e => {
        this.setState({
            initialMessages: [
                ...this.state.initialMessages,
                eventToJson(e).message,
            ],
        });

        e.preventDefault();
        e.stopPropagation();
    };

    render() {
        return (
            <Container className="mt-2">
                <Row>
                    <Col>
                        <Jumbotron>
                            <h2 className="display-3">Initial messages</h2>
                            <p className="lead">
                                A list of message you want to show to your
                                website users when they open a new thread.
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                            {this.state.initialMessages.map((message, i) => (
                                <ListGroupItem
                                    key={i}
                                    className="d-flex justify-content-between"
                                >
                                    <div className="d-flex flex-column justify-content-center">
                                        {message}
                                    </div>
                                    <div>
                                        <Button
                                            color="danger"
                                            onClick={() =>
                                                this.setState({
                                                    initialMessages: [
                                                        ...this.state
                                                            .initialMessages,
                                                    ].filter(
                                                        (x, index) =>
                                                            index !== i
                                                    ),
                                                })
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Form inline onSubmit={this.onAddMessage}>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Input
                                    name="message"
                                    placeholder="Hello, how can I help you?"
                                    required
                                />
                            </FormGroup>
                            <Button>Add</Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr />
                        {this.props.errorSaving ? (
                            <Alert color="danger">Something happened</Alert>
                        ) : null}
                        <div className="d-flex">
                            <Button onClick={this.handleSubmit}>Save</Button>
                            {this.props.saving ? (
                                <Spinner color="primary" className="ml-3" />
                            ) : null}
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MeHoc()(InitialMessages);
