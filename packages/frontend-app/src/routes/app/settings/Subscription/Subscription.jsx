import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { selectedOrganization } from '../../../../stores/organization/selectors';
import FetcherWrapper from '../../../../hComponents/Fetcher';

import { Container, Row, Col, Jumbotron } from 'reactstrap';
import { getOrganizationSubscriptions } from '../../../../stores/subscription/actions';
import { selectOrganizationSubscriptions } from '../../../../stores/subscription/selectors';
import DateHelpers from '../../../../helpers/date';

class Subscription extends Component {
    getCurrentSubscription = () => {
        const now = moment().unix();
        return this.props.subscriptions.entities.find(
            subscription => subscription.from <= now && subscription.to >= now
        );
    };
    render() {
        const currentSubscription = this.getCurrentSubscription();

        return (
            <Container className="mt-2">
                <Row>
                    <Col>
                        <Jumbotron>
                            <h2 className="display-3">
                                {currentSubscription &&
                                currentSubscription.type === 'paid'
                                    ? 'Paid'
                                    : 'Free'}{' '}
                                subscription
                            </h2>
                            <p>
                                Until:{' '}
                                {DateHelpers.niceDateTime(
                                    moment.unix(currentSubscription.to)
                                )}
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(state => ({
    organization: selectedOrganization(state),
}))(
    FetcherWrapper({
        fetch: [props => getOrganizationSubscriptions(props.organization.id)],
        select: {
            subscriptions: (state, props) =>
                selectOrganizationSubscriptions(state, props.organization.id),
        },
    })(Subscription)
);
