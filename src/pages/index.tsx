import Main from '@/components/Main';
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
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
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Home;
