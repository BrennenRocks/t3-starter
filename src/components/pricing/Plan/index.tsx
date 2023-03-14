import type { PlanNameType } from '@/utils/consts/plans';
import { PLAN_NAMES } from '@/utils/consts/plans';
import { PLANS } from '@/utils/consts/plans';
import { capitalizeFirstLetter } from '@/utils/functions/strings';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useLocalStorage } from '@/hooks/local-storage';

interface PlanProps {
  planName: PlanNameType;
}

const Plan = ({ planName }: PlanProps) => {
  const [, setPlan] = useLocalStorage('plan', planName);
  const { status } = useSession();
  const router = useRouter();
  const plan = PLANS[planName];

  const handleGetStarted = () => {
    setPlan(PLAN_NAMES.basic);
    const checkoutUrl = `/pricing/${planName}`;
    if (status === 'authenticated') {
      void router.push(checkoutUrl);
      return;
    }

    // TODO: Try to make this remember which plan is chosen
    void signIn('google', { callbackUrl: checkoutUrl });
  };

  return (
    <div className="card w-full bg-neutral text-neutral-content">
      <div className="card-body">
        <div>
          <div className="mb-2 text-sm text-cyan-400">
            {capitalizeFirstLetter(planName)}
          </div>
          <h2 className="card-title text-3xl">${plan.price} / mo</h2>
        </div>
        <hr className="mt-2 mb-4 h-px w-1/2 border-0 bg-cyan-400" />
        <div>
          <ul className="list-inside space-y-2">
            {plan.perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
          <div className="card-actions mt-8">
            <button
              className="btn-outline btn text-cyan-400"
              onClick={handleGetStarted}
              disabled={status === 'loading'}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
