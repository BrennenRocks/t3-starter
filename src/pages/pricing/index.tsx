import { type NextPage } from 'next';
import Main from '@/components/Main';
import { PLAN_NAMES } from '@/utils/consts/plans';
import { Plan } from '@/components/pricing';

const Pricing: NextPage = () => {
  return (
    <Main>
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-12 py-16 sm:flex-row sm:px-4">
        <Plan planName={PLAN_NAMES.basic} />
        <Plan planName={PLAN_NAMES.pro} />
      </div>
    </Main>
  );
};

export default Pricing;
