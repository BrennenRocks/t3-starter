import CheckoutForm from 'src/pages/pricing/CheckoutForm';
import { env } from '@/env/client.mjs';
import type { PlanNameType } from '@/utils/consts/plans';
import { PLANS } from '@/utils/consts/plans';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default Checkout;
