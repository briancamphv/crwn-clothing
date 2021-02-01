import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const onToken = token => {
    console.log(token);
    alert('Got Payment');
}

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publisableKey = 'pk_test_51HsahqCeDJ6l1e0JZk3PaHTW61vRf4X496KuUyg9BQ53SMd05qJ0F6cLfyfuxcruo7nTTe3Iyw5tUrC4HQhfASey0073EGl5Tf'

    return (
        <StripeCheckout
            label='Pay Now'
            className='button'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publisableKey}

        />
    )
}

export default StripeCheckoutButton