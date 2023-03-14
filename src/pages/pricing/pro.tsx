import Main from '@/components/Main';
import { CheckoutForm } from '@/components/pricing';
import { env } from '@/env/client.mjs';
import { PLAN_NAMES } from '@/utils/consts/plans';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const stripePromise = loadStripe(env.NEXT_PUBLIC_DEV_STRIPE_PUBLISHABLE_KEY);

const ProCheckout = () => {
  return (
    <Main>
      <div className="container flex items-center justify-center gap-12 px-4 py-16">
        <Elements stripe={stripePromise}>
          <CheckoutForm planName={PLAN_NAMES.pro} />
        </Elements>
      </div>
    </Main>
  );
};

export default ProCheckout;
