import React from 'react';
import { injectStripe, Elements } from 'react-stripe-elements';

export default (options = {}) => (WrappedComponent) => {
    const Stripe = injectStripe(WrappedComponent);

    return (props) => (
        <Elements>
            <Stripe {...props} />
        </Elements>
    );
};
