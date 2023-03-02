import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router.js';
import { api } from '../../../utils/api';

interface CheckoutFormProps {
  priceId: string;
}

const CheckoutForm = ({ priceId }: CheckoutFormProps) => {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated: () => {
      router.back();
    },
  });

  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const createSubscription = api.stripe.createSubscription.useMutation();

  const handleCardInputChange = (e: StripeCardElementChangeEvent) => {
    setDisabled(e?.empty);
    setError(e?.error?.message ?? '');
  };

  const handleCheckoutFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const subscriptionRes = await createSubscription.mutateAsync({ priceId });
    const cardElement = elements.getElement(CardElement);
    if (!subscriptionRes.clientSecret || !cardElement) {
      setError('There was an error, try again later');
      return;
    }

    const stripePayload = await stripe.confirmCardPayment(
      subscriptionRes.clientSecret,
      { payment_method: { card: cardElement } }
    );

    if (stripePayload.error) {
      setError(stripePayload.error.message ?? '');
    }
  };

  return (
    <form
      onSubmit={handleCheckoutFormSubmit}
      className="card w-1/4 bg-indigo-900 text-white shadow-xl"
    >
      <div className="card-body">
        <h2 className="card-title">Start Your Training</h2>
        <CardElement
          onChange={handleCardInputChange}
          options={{
            style: {
              base: {
                color: 'white',
              },
            },
          }}
        />
        <button
          disabled={!stripe && disabled}
          type="submit"
          className="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white"
        >
          Pay Now
        </button>
        <div className="text-red-600">{error}</div>
      </div>
    </form>
  );
};

export default CheckoutForm;
