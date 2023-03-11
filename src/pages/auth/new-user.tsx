import Main from '@/components/Main';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import React from 'react';

const NewUser = () => {
  const router = useRouter();
  const createTenant = api.tenant.create.useMutation();

  const onEmployerClick = () => {
    createTenant.mutate();
    void router.replace('/pricing');
  };

  return (
    <Main>
      <div className="container flex items-center justify-center gap-4">
        <button className="btn" disabled>
          I Have A Code
        </button>
        <button className="btn" onClick={onEmployerClick}>
          Employer
        </button>
      </div>
    </Main>
  );
};

export default NewUser;
