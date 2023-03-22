import Main from '@/components/Main';
import { type NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { status } = useSession();

  const router = useRouter();

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
                <button
                  disabled={status === 'loading'}
                  onClick={() =>
                    status === 'authenticated'
                      ? void router.push('/dashboard')
                      : void signIn('google')
                  }
                  className="btn-primary btn"
                >
                  {status === 'authenticated'
                    ? 'Dashboard'
                    : 'Sign In To Get Started'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Home;
