import Main from '@/components/Main';
import { CheckoutForm } from '@/components/pricing';
import { env } from '@/env/client.mjs';
import type { PlanNameType } from '@/utils/consts/plans';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import React from 'react';

const stripePromise = loadStripe(env.NEXT_PUBLIC_DEV_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { query } = useRouter();
  const planName = query.plan as PlanNameType;

  return (
    <Main>
      <div className="container flex items-center justify-center gap-12 px-4 py-16">
        {!planName ? (
          <progress className="progress w-56" />
        ) : (
          <Elements stripe={stripePromise}>
            <CheckoutForm planName={planName} />
          </Elements>
        )}
      </div>
    </Main>
  );
};

export default Checkout;
