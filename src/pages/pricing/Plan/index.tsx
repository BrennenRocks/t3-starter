import type { PlanNameType } from '@/utils/consts/plans';
import { PLANS } from '@/utils/consts/plans';
import { capitalizeFirstLetter } from '@/utils/functions/strings';
import { useRouter } from 'next/router';
import React from 'react';

interface PlanProps {
  planName: PlanNameType;
}

const Plan = ({ planName }: PlanProps) => {
  const router = useRouter();
  const plan = PLANS[planName];

  return (
    <div className="card w-96 bg-neutral text-neutral-content">
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
              onClick={() => void router.push(`/pricing/${planName}`)}
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
