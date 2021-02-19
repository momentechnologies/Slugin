import React from 'react';
import {
    Container,
    Form,
    Label,
    Input,
    Col,
    Button,
    Row,
    Alert,
} from 'reactstrap';
import ManagedFormGroup from '../../../../components/ManagedFormGroup';
import Loader from '../../../../components/Loader';

class Info extends React.Component {
    state = {
        firstName: null,
        lastName: null,
        errors: [],
        error: false,
    };

    getValue = key => {
        if (this.state[key]) {
            return this.state[key];
        }

        return this.props.me[key];
    };

    render() {
        return (
            <Container className="mt-3">
                <Row>
                    <Col md={6}>
                        <Form>
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
                                            value={this.getValue('firstName')}
                                            onChange={e =>
                                                this.setState({
                                                    firstName: e.target.value,
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
                                            value={this.getValue('lastName')}
                                            onChange={e =>
                                                this.setState({
                                                    lastName: e.target.value,
                                                })
                                            }
                                            invalid={!!errors}
                                        />
                                    </React.Fragment>
                                )}
                            </ManagedFormGroup>
                        </Form>
                        <hr />
                        {this.props.error ? (
                            <Alert color="danger">
                                {this.props.error.message}
                            </Alert>
                        ) : null}
                        {this.props.loading ? (
                            <Loader size={30} />
                        ) : (
                            <Button
                                onClick={() => {
                                    this.props.update(
                                        this.getValue('firstName'),
                                        this.getValue('lastName')
                                    );
                                }}
                            >
                                Save
                            </Button>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Info;
