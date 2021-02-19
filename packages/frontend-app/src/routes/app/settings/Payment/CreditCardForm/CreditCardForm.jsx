import React from 'react';
import {
    Elements,
    injectStripe,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
} from 'react-stripe-elements';

import Spinner from '../../../../../components/Loader';
import { Alert } from 'reactstrap';

import styles from './creditCardForm.module.css';

class ClientInfo extends React.Component {
    state = {
        number: false,
        cvc: false,
        expiresAt: false,
        loading: false,
        error: false,
    };

    handleChange = field => {
        return e => {
            this.setState({ [field]: e.complete }, this.getToken);
        };
    };

    getToken = () => {
        if (!this.state.number || !this.state.cvc || !this.state.expiresAt)
            return;

        this.setState({ loading: true, error: false });
        this.props.stripe
            .createToken()
            .then(response => {
                if (response.error) {
                    return this.setState({
                        loading: false,
                        error: 'Noe skjedde. Vennligst prøv igjen.',
                    });
                }
                this.setState({ loading: false, error: false }, () =>
                    this.props.onToken(response.token.id)
                );
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    error: 'Noe skjedde. Vennligst prøv igjen.',
                });
            });
    };

    render() {
        return (
            <div className={styles.creditCardForm}>
                <div className={styles.cardBlock}>
                    <div className={styles.cardHeader}>
                        <div>
                            <strong>Secure payment</strong>
                        </div>
                        <div className={styles.lock}>
                            <div className="fa fa-lock" />
                        </div>
                    </div>
                    <div className={styles.cardNumber}>
                        Card number
                        <CardNumberElement
                            className={styles.input}
                            onChange={this.handleChange('number')}
                        />
                    </div>
                    <div className={styles.cardOtherInfo}>
                        <div>
                            <div>Expiration date</div>
                            <CardExpiryElement
                                className={styles.input}
                                onChange={this.handleChange('expiresAt')}
                            />
                        </div>
                        <div>
                            CVC
                            <CardCVCElement
                                className={styles.input}
                                onChange={this.handleChange('cvc')}
                            />
                        </div>
                    </div>
                    {this.state.loading ? (
                        <div className={styles.spinner}>
                            <Spinner black />
                        </div>
                    ) : (
                        ''
                    )}
                    {this.state.error ? (
                        <div className={styles.error}>
                            <Alert color="red">error</Alert>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        );
    }
}

const Enhenced = injectStripe(ClientInfo);

export default props => (
    <Elements>
        <Enhenced {...props} />
    </Elements>
);
