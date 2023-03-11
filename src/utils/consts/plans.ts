import { env } from '@/env/client.mjs';

export const PLAN_NAMES = {
  basic: 'basic',
  pro: 'pro',
} as const;

export type PlanNameType = keyof typeof PLAN_NAMES;

interface PlanSpecifics {
  stripePriceId: string;
  price: number;
  perks: readonly string[];
}

export const PLANS: { [k in PlanNameType]: PlanSpecifics } = {
  [PLAN_NAMES.basic]: {
    stripePriceId: env.NEXT_PUBLIC_BASIC_PRICE_ID,
    price: 4.99,
    perks: ['20 users', '3 Trainings'],
  },
  [PLAN_NAMES.pro]: {
    stripePriceId: env.NEXT_PUBLIC_PRO_PRICE_ID,
    price: 14.99,
    perks: ['100 users', '20 Trainings'],
  },
} as const;
