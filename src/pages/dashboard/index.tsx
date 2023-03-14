import Main from '@/components/Main';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const Dashboard = () => {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated: () => void router.replace('/'),
  });

  return (
    <Main>
      <div className="container flex flex-col items-center justify-center">
        Dashboard Page
      </div>
    </Main>
  );
};

export default Dashboard;
