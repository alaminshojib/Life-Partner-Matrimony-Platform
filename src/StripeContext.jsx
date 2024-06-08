

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Ensure the Stripe publishable key is treated as a string
const stripePublishableKey = import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY ;
const stripePromise = loadStripe(stripePublishableKey);
const StripeContext = ({ children }) => (
  <Elements stripe={stripePromise}>
    {children}
  </Elements>
);

export default StripeContext;
