import React from 'react';

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
import eventToJson from '../../../../helpers/eventToJson';

export default props => (
    <Container className="mt-2">
        <Row>
            <Col>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.me.organizations
                            .map(o => o.organization)
                            .map(organization => (
                                <tr key={organization.id}>
                                    <th scope="row">{organization.id}</th>
                                    <td>{organization.name}</td>
                                    <td>
                                        <Button
                                            onClick={() =>
                                                props.history.push(
                                                    `/app/${organization.id}`
                                                )
                                            }
                                        >
                                            Go to
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form
                    inline
                    onSubmit={e => {
                        console.log(eventToJson(e));

                        props
                            .createOrganization(eventToJson(e).name)
                            .catch(error => {
                                console.log(error);
                            });

                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input
                            type="text"
                            name="name"
                            placeholder="Slugin"
                            required
                        />
                    </FormGroup>
                    <Button>Create new organization</Button>
                </Form>
            </Col>
        </Row>
    </Container>
);
