import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectedOrganization } from '../../../../stores/organization/selectors';
import StripeWrapper from '../../../../hComponents/Stripe';
import FetcherWrapper from '../../../../hComponents/Fetcher';
import Loader from '../../../../components/Loader';
import CreditCardForm from './CreditCardForm';

import { Container, Row, Col, Button, Table } from 'reactstrap';
import { getOrganizationCards, addCard } from '../../../../stores/card/actions';
import { selectOrganizationCards } from '../../../../stores/card/selectors';

class Theme extends Component {
    state = {
        addCard: false,
        token: null,
        error: false,
        cards: [],
    };

    onAdd = () => {
        this.setState({ adding: true });
        this.props
            .addCard(this.props.organization.id, this.state.token)
            .then(() => {
                this.setState({
                    addCard: false,
                    adding: false,
                });
            })
            .catch(console.error);
    };

    render() {
        return (
            <Container className="mt-2">
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Last 4</th>
                                    <th>Expires month</th>
                                    <th>Expires year</th>
                                    <th>Primary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.cards.entities.map(card => (
                                    <tr key={card.id}>
                                        <td>{card.last4}</td>
                                        <td>{card.expiresMonth}</td>
                                        <td>{card.expiresYear}</td>
                                        <td>{card.primary ? 'primary' : ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.addCard ? (
                            <React.Fragment>
                                <CreditCardForm
                                    onToken={token => this.setState({ token })}
                                />
                                {this.state.adding ? (
                                    <Loader />
                                ) : (
                                    <Button
                                        className="mt-3"
                                        disabled={!this.state.token}
                                        onClick={this.onAdd}
                                    >
                                        Add
                                    </Button>
                                )}
                            </React.Fragment>
                        ) : (
                            <Button
                                onClick={() => this.setState({ addCard: true })}
                            >
                                Add card
                            </Button>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(
    state => ({
        organization: selectedOrganization(state),
    }),
    { addCard }
)(
    FetcherWrapper({
        fetch: [props => getOrganizationCards(props.organization.id)],
        select: {
            cards: (state, props) =>
                selectOrganizationCards(state, props.organization.id),
        },
    })(StripeWrapper()(Theme))
);
