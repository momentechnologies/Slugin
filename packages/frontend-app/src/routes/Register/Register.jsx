import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Button,
    Row,
    Card,
    Alert,
} from 'reactstrap';
import ManagedFormGroup from '../../components/ManagedFormGroup';
import Loader from '../../components/Loader';

class Signup extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        organizationName: '',
        acceptedNewsletterText: null,
        errors: [],
        error: false,
    };

    render() {
        return (
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h3>Get Started</h3>
                        <p>Fill in your information to get started.</p>
                        <p>
                            When you have registered you will need to confirm
                            your email. Then we will walk you through the steps
                            to setup the live chat on your website.
                        </p>
                        <p>You will not be charged anything</p>
                    </Col>
                    <Col md={6}>
                        <Card body>
                            <Form>
                                <ManagedFormGroup
                                    error={this.props.error}
                                    inputKey="organizationName"
                                >
                                    {errors => (
                                        <React.Fragment>
                                            <Label>Organization name</Label>
                                            <Input
                                                type="text"
                                                name="organizationName"
                                                placeholder="Organization name"
                                                value={
                                                    this.state.organizationName
                                                }
                                                onChange={e =>
                                                    this.setState({
                                                        organizationName:
                                                            e.target.value,
                                                    })
                                                }
                                                invalid={!!errors}
                                            />
                                        </React.Fragment>
                                    )}
                                </ManagedFormGroup>
                                <ManagedFormGroup
                                    error={this.props.error}
                                    inputKey="firstName"
                                >
                                    {errors => (
                                        <React.Fragment>
                                            <Label>First name</Label>
                                            <Input
                                                type="text"
                                                name="firstName"
                                                placeholder="First name"
                                                value={this.state.firstName}
                                                onChange={e =>
                                                    this.setState({
                                                        firstName:
                                                            e.target.value,
                                                    })
                                                }
                                                invalid={!!errors}
                                            />
                                        </React.Fragment>
                                    )}
                                </ManagedFormGroup>
                                <ManagedFormGroup
                                    error={this.props.error}
                                    inputKey="lastName"
                                >
                                    {errors => (
                                        <React.Fragment>
                                            <Label>Last name</Label>
                                            <Input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last name"
                                                value={this.state.lastName}
                                                onChange={e =>
                                                    this.setState({
                                                        lastName:
                                                            e.target.value,
                                                    })
                                                }
                                                invalid={!!errors}
                                            />
                                        </React.Fragment>
                                    )}
                                </ManagedFormGroup>
                                <ManagedFormGroup
                                    error={this.props.error}
                                    inputKey="email"
                                >
                                    {errors => (
                                        <React.Fragment>
                                            <Label>Email</Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={this.state.email}
                                                onChange={e =>
                                                    this.setState({
                                                        email: e.target.value,
                                                    })
                                                }
                                                invalid={!!errors}
                                            />
                                        </React.Fragment>
                                    )}
                                </ManagedFormGroup>
                                <ManagedFormGroup
                                    error={this.props.error}
                                    inputKey="password"
                                >
                                    {errors => (
                                        <React.Fragment>
                                            <Label>Password</Label>
                                            <Input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={this.state.password}
                                                onChange={e =>
                                                    this.setState({
                                                        password:
                                                            e.target.value,
                                                    })
                                                }
                                                invalid={!!errors}
                                            />
                                        </React.Fragment>
                                    )}
                                </ManagedFormGroup>
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
                                    <a href="/tp" target="_blank">
                                        Policies
                                    </a>
                                    .
                                </p>
                            </Form>
                            {this.props.error ? (
                                <Alert color="danger">
                                    {this.props.error.message}
                                </Alert>
                            ) : (
                                ''
                            )}
                            {this.props.loading ? (
                                <Loader size={30} />
                            ) : (
                                <Button
                                    onClick={() => {
                                        this.props.createNewUser({
                                            email: this.state.email,
                                            password: this.state.password,
                                            firstName: this.state.firstName,
                                            lastName: this.state.lastName,
                                            organizationName: this.state
                                                .organizationName,
                                            newsletterText: this.state
                                                .acceptedNewsletterText
                                                ? this.state
                                                      .acceptedNewsletterText
                                                : undefined,
                                        });
                                    }}
                                >
                                    Get Started
                                </Button>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Signup);
