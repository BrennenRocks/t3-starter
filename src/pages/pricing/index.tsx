import { type NextPage } from 'next';
import Main from '@/components/Main';
import { PLAN_NAMES } from '@/utils/consts/plans';
import Plan from './Plan';

const Pricing: NextPage = () => {
  return (
    <Main>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex w-full justify-evenly">
          <Plan planName={PLAN_NAMES.basic} />
          <Plan planName={PLAN_NAMES.pro} />
        </div>
      </div>
    </Main>
  );
};

export default Pricing;
