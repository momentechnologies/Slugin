import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Container,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Col,
    Button,
    Row,
    Card,
    Alert,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';

class EditReply extends React.Component {
    state = {
        replyTitle: '',
        replyText: '',
        triggers: [],
        triggerText: '',
    };

    onSave = event => {
        this.props.updateOrCreate({
            title: this.state.replyTitle,
            reply: this.state.replyText,
            triggers: this.state.triggers,
        });

        event.preventDefault();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.reply !== this.props.reply) {
            this.setState({
                replyTitle: this.props.reply.title,
                replyText: this.props.reply.replyText,
                triggers: this.props.reply.triggers.map(t => t.sentence),
            });
        }
    }

    componentDidMount(prevProps, prevState, snapshot) {
        if (this.props.reply) {
            this.setState({
                replyTitle: this.props.reply.title,
                replyText: this.props.reply.replyText,
                triggers: this.props.reply.triggers
                    ? this.props.reply.triggers.map(t => t.sentence)
                    : [],
            });
        }
    }

    onAddItemtoTriggers = () => {
        if (this.state.triggerText === '') {
            return;
        }
        this.setState({
            triggers: [...this.state.triggers, this.state.triggerText],
            triggerText: '',
        });
    };

    render() {
        return (
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <Card body>
                            <FormGroup>
                                <Label>Reply title</Label>
                                <Input
                                    type="replyTitle"
                                    name="replyTitle"
                                    placeholder="title"
                                    value={this.state.replyTitle}
                                    onChange={e =>
                                        this.setState({
                                            replyTitle: e.target.value,
                                        })
                                    }
                                    invalid={
                                        !!(
                                            this.state.errors &&
                                            this.state.errors.replyTitle
                                        )
                                    }
                                />
                                {this.state.errors &&
                                this.state.errors.replyTitle ? (
                                    <FormFeedback>
                                        {this.state.errors.replyTitle}
                                    </FormFeedback>
                                ) : (
                                    ''
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label>Reply text</Label>
                                <Input
                                    type="replyText"
                                    name="replyText"
                                    placeholder="text"
                                    value={this.state.replyText}
                                    onChange={e =>
                                        this.setState({
                                            replyText: e.target.value,
                                        })
                                    }
                                    invalid={
                                        !!(
                                            this.state.errors &&
                                            this.state.errors.replyText
                                        )
                                    }
                                />
                                {this.state.errors &&
                                this.state.errors.replyText ? (
                                    <FormFeedback>
                                        {this.state.errors.replyText}
                                    </FormFeedback>
                                ) : (
                                    ''
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label>When to trigger?</Label>
                                <ListGroup>
                                    {this.state.triggers.map(
                                        (trigger, index) => (
                                            <ListGroupItem key={index}>
                                                {trigger}
                                            </ListGroupItem>
                                        )
                                    )}
                                    <ListGroupItem>
                                        <Input
                                            placeholder="Reply"
                                            value={this.state.triggerText}
                                            onChange={e =>
                                                this.setState({
                                                    triggerText: e.target.value,
                                                })
                                            }
                                            invalid={
                                                !!(
                                                    this.state.errors &&
                                                    this.state.errors.replyText
                                                )
                                            }
                                            onKeyDown={event => {
                                                if (event.key === 'Tab') {
                                                    event.preventDefault();
                                                }
                                            }}
                                            onKeyUp={event => {
                                                if (
                                                    ['Tab', 'Enter'].indexOf(
                                                        event.key
                                                    ) !== -1
                                                ) {
                                                    this.onAddItemtoTriggers(
                                                        event.target.value
                                                    );
                                                }
                                            }}
                                        />
                                    </ListGroupItem>
                                </ListGroup>
                                {this.state.errors &&
                                this.state.errors.replyText ? (
                                    <FormFeedback>
                                        {this.state.errors.replyText}
                                    </FormFeedback>
                                ) : (
                                    ''
                                )}
                            </FormGroup>
                            {this.props.error ? (
                                <Alert color="danger">{this.props.error}</Alert>
                            ) : (
                                ''
                            )}
                            <Button onClick={this.onSave}>Save</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(EditReply);
