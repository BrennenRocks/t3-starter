import Main from '@/components/Main';
import { useReadLocalStorage } from '@/hooks/local-storage';
import { api } from '@/utils/api';
import type { PlanNameType } from '@/utils/consts/plans';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const NewUser = () => {
  const plan = useReadLocalStorage<PlanNameType | undefined>('plan');
  const router = useRouter();
  const createTenant = api.tenant.create.useMutation();

  const [tenantName, setTenantName] = useState('');

  const onEmployerClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    createTenant.mutate({ tenantName });
    void router.replace(`/pricing/${plan ?? ''}`);
  };

  return (
    <Main>
      <div className="container flex items-center justify-center gap-4">
        <button className="btn" disabled>
          I Have A Code
        </button>
        <form className="form-control">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <label className="input-group input-group-vertical">
            <span>Tenant Name</span>
            <input
              type="text"
              placeholder="We Build Stuff"
              className="input-bordered input"
              onChange={(e) => setTenantName(e.target.value)}
            />
          </label>
          <button className="btn" onClick={onEmployerClick}>
            Employer
          </button>
        </form>
      </div>
    </Main>
  );
};

export default NewUser;
