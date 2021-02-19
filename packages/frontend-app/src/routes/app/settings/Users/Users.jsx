import React, { Component } from 'react';
import eventToJson from '../../../../helpers/eventToJson';

import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Form,
    FormGroup,
    Input,
} from 'reactstrap';
import MeHoc from '../../../../hComponents/Me';

class Users extends Component {
    handleSubmit = e => {
        console.log(eventToJson(e));

        this.props.invite(eventToJson(e).email).catch(error => {
            console.log(error);
        });

        e.preventDefault();
        e.stopPropagation();
    };

    render() {
        return (
            <Container className="mt-2">
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.selectedOrganization.users
                                    .map(u => u.user)
                                    .map(u => (
                                        <tr key={u.id}>
                                            <th scope="row">{u.id}</th>
                                            <td>{u.firstName}</td>
                                            <td>{u.lastName}</td>
                                            <td>{u.email}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form inline onSubmit={this.handleSubmit}>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="email@domain.com"
                                    required
                                />
                            </FormGroup>
                            <Button>Invite</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MeHoc()(Users);
