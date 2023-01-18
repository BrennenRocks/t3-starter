import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { env } from '../../env/client.mjs';
import CheckoutForm from './stripe-checkout';

const stripePromise = loadStripe(env.NEXT_PUBLIC_DEV_STRIPE_PUBLISHABLE_KEY);

const PricingPage = () => {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated: () => {
      router.back();
    },
  });
  const [priceId, setPriceId] = useState('');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex w-full justify-evenly">
          <div className="flex-col rounded-lg border-2 px-2 py-4">
            <div className="font-bold text-white">Basic $5.00</div>
            <button
              className="h-10 rounded-md bg-black px-6 font-semibold text-white"
              onClick={() => setPriceId('price_1MNu5fBvdnSSTZyUEEs0Nwgh')}
            >
              Subscribe now
            </button>
          </div>
          <div className="flex-col rounded-lg border-2 px-2 py-4">
            <div className="font-bold text-white">Premium $15.00</div>
            <button
              className="h-10 rounded-md bg-black px-6 font-semibold text-white"
              onClick={() => setPriceId('price_1MNu67BvdnSSTZyUuTNDRYM9')}
            >
              Subscribe now
            </button>
          </div>
        </div>
        {priceId && (
          <Elements stripe={stripePromise}>
            <CheckoutForm priceId={priceId} />
          </Elements>
        )}
      </div>
    </main>
  );
};

export default PricingPage;
