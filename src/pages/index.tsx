import Main from '@/components/Main';
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { api } from '../utils/api';

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: 'Yo Momma' });

  return (
    <>
      <Head>
        <title>Employee Training</title>
        <meta name="description" content="Employee training made easy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <div className="container flex flex-col gap-12 px-44 py-16">
          <div className="hero justify-start">
            <div className="hero-content flex-col lg:flex-row">
              <div>
                <p className="py-6 text-xs text-secondary opacity-60">
                  JOIN WITH OTHERS
                </p>
                <h1 className="text-5xl font-bold">
                  Train Smarter, Not Harder
                </h1>
                <p className="py-6 font-semibold">
                  Revolutionize Your Employee Learning with E-Training
                </p>
                <Link href="/pricing" className="btn-primary btn">
                  Pricing
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">
              {hello.data ? hello.data.greeting : 'Loading tRPC query...'}
            </p>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Home;
