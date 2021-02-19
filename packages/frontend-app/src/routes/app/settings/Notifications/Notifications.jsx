import React, { Component } from 'react';

import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Jumbotron,
} from 'reactstrap';

import styles from './notifications.module.css';
import MeHoc from '../../../../hComponents/Me';
import Loader from '../../../../components/Loader';

const options = [
    {
        name: 'Activity in new conversations',
        key: 'new_conversations',
    },
    {
        name: 'Activity in anything assigned to you',
        key: 'assigned_to_me',
    },
];

class Notifications extends Component {
    state = {
        saving: false,
    };

    getValue = (key, notificationType) => {
        const index = `${key}/${notificationType}`;

        if (this.state[index]) {
            return this.state[index].canSend;
        }

        const dbNotification = this.props.notifications.find(
            n =>
                n.notificationName === key &&
                n.notificationType === notificationType
        );

        if (dbNotification) {
            return dbNotification.canSend;
        }

        return false;
    };

    toggle = (key, notificationType) => {
        const index = `${key}/${notificationType}`;

        this.setState({
            [index]: {
                notificationName: key,
                notificationType,
                canSend: !this.getValue(key, notificationType),
            },
        });
    };

    onSubmit = e => {
        this.setState({ saving: true });
        this.props
            .updateNotifications(
                Object.values(this.state).filter(v => typeof v === 'object')
            )
            .then(() => {
                this.setState({ saving: false });
            })
            .catch(() => {
                this.setState({ saving: false, error: true });
            });

        e.preventDefault();
        e.stopPropagation();
    };

    render() {
        return (
            <Container className="mt-4">
                <Row>
                    <Col>
                        <Jumbotron>
                            <h2 className="display-3">Notifications</h2>
                            <p className="lead">
                                Choose what automatic emails you want to receive
                                from us.
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={this.onSubmit}>
                            {options.map(option => (
                                <FormGroup key={option.key} row>
                                    <Label sm={4}>{option.name}</Label>
                                    <Col
                                        sm={8}
                                        className={styles.checkboxContainer}
                                    >
                                        <FormGroup check>
                                            <Label check>
                                                <Input
                                                    type="checkbox"
                                                    checked={this.getValue(
                                                        option.key,
                                                        'email'
                                                    )}
                                                    onChange={e => {
                                                        this.toggle(
                                                            option.key,
                                                            'email'
                                                        );
                                                    }}
                                                />{' '}
                                                Email
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            ))}
                            <hr />
                            <div className="d-flex">
                                <Button>Save</Button>
                                {this.state.saving ? (
                                    <div className="ml-4">
                                        <Loader size={25} />
                                    </div>
                                ) : null}
                            </div>
                            {this.state.error ? (
                                <Alert color="danger" className="mt-2">
                                    Something happened
                                </Alert>
                            ) : (
                                ''
                            )}
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MeHoc()(Notifications);
