import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Container,
    Col,
    Row,
    Alert,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Button,
    Card,
} from 'reactstrap';

class Signup extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        password: '',
    };

    onSubmit = () => {
        this.props
            .confirmUser({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        console.log(this.state);
        return (
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <Card body>
                            <Form>
                                <FormGroup>
                                    <Label>First name</Label>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        placeholder="First name"
                                        value={this.state.firstName}
                                        onChange={e =>
                                            this.setState({
                                                firstName: e.target.value,
                                            })
                                        }
                                        invalid={
                                            !!(
                                                this.state.errors &&
                                                this.state.errors.firstName
                                            )
                                        }
                                    />
                                    {this.state.errors &&
                                    this.state.errors.firstName ? (
                                        <FormFeedback>
                                            {this.state.errors.firstName.msg}
                                        </FormFeedback>
                                    ) : (
                                        ''
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Label>Last name</Label>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last name"
                                        value={this.state.lastName}
                                        onChange={e =>
                                            this.setState({
                                                lastName: e.target.value,
                                            })
                                        }
                                        invalid={
                                            !!(
                                                this.state.errors &&
                                                this.state.errors.lastName
                                            )
                                        }
                                    />
                                    {this.state.errors &&
                                    this.state.errors.lastName ? (
                                        <FormFeedback>
                                            {this.state.errors.lastName.msg}
                                        </FormFeedback>
                                    ) : (
                                        ''
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={e =>
                                            this.setState({
                                                password: e.target.value,
                                            })
                                        }
                                        invalid={
                                            !!(
                                                this.state.errors &&
                                                this.state.errors.password
                                            )
                                        }
                                    />
                                    {this.state.errors &&
                                    this.state.errors.password ? (
                                        <FormFeedback>
                                            {this.state.errors.password.msg}
                                        </FormFeedback>
                                    ) : (
                                        ''
                                    )}
                                </FormGroup>
                                <FormGroup check className="mb-4">
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            checked={
                                                !!this.state
                                                    .acceptedNewsletterText
                                            }
                                            onChange={() =>
                                                this.setState({
                                                    acceptedNewsletterText: this
                                                        .state
                                                        .acceptedNewsletterText
                                                        ? null
                                                        : 'Inform me about new features and updates (no more than once a week)',
                                                })
                                            }
                                        />
                                        Inform me about new features and updates
                                        (no more than once a week)
                                    </Label>
                                </FormGroup>
                                <p>
                                    By clicking "get started" you agree to our{' '}
                                    <a
                                        href="/legal/terms-of-use"
                                        target="_blank"
                                    >
                                        Terms of use
                                    </a>{' '}
                                    and privacy policy .
                                </p>
                            </Form>
                            {this.props.error ? (
                                <Alert color="danger">{this.props.error}</Alert>
                            ) : (
                                ''
                            )}
                            <Button onClick={this.onSubmit}>Get Started</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Signup);
