import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Container,
    Form,
    Label,
    Input,
    Col,
    Button,
    Row,
    Card,
    Alert,
} from 'reactstrap';
import ManagedFormGroup from '../../components/ManagedFormGroup';
import Loader from '../../components/Loader/Loader';

class Signup extends React.Component {
    state = {
        email: '',
        password: '',
    };

    onSubmit = event => {
        this.props.login({
            email: this.state.email,
            password: this.state.password,
        });

        event.preventDefault();
    };

    render() {
        return (
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <Card body>
                            <Form onSubmit={this.onSubmit}>
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
                                                placeholder="email"
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
                                                placeholder="password"
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
                                    <Button type="submit">Login</Button>
                                )}
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Signup);
