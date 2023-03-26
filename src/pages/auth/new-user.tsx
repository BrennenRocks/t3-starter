import Main from '@/components/Main';
import { useReadLocalStorage } from '@/hooks/local-storage';
import { api } from '@/utils/api';
import type { PlanNameType } from '@/utils/consts/plans';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import {
  LocalStorageKeys,
  resetLocalStorage,
} from 'src/services/local-storage';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('employee'),
    tenantCode: z.string(),
  }),
  z.object({
    type: z.literal('employer'),
    tenantName: z.string(),
  }),
]);

type SchemaType = z.infer<typeof schema>;

const NewUser = () => {
  const plan = useReadLocalStorage<PlanNameType | undefined>(
    LocalStorageKeys.PLAN
  );

  const router = useRouter();
  const createTenant = api.tenant.create.useMutation();

  const [isEmployee, setIsEmployee] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const onEmployerClick: SubmitHandler<SchemaType> = (data, e) => {
    e?.preventDefault();
    console.log('employer', { data });
    if (data.type === 'employee') {
      return;
    }

    createTenant.mutate({ tenantName: data.tenantName });
    void router.replace(`/pricing/${plan ?? ''}`);
    resetLocalStorage();
  };

  const onEmployeeClick: SubmitHandler<SchemaType> = (data) => {
    console.log('employee', { data });
    if (data.type === 'employer') {
      return;
    }

    // handle entering a code
  };

  return (
    <Main>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="btn-group">
          <button
            className={`btn ${isEmployee ? 'btn-active' : ''}`}
            onClick={() => setIsEmployee(true)}
          >
            I Have A Code
          </button>
          <button
            className={`btn ${!isEmployee ? 'btn-active' : ''}`}
            onClick={() => setIsEmployee(false)}
          >
            I am an Employer
          </button>
        </div>
        <form className="form-control">
          {isEmployee ? (
            <>
              <label className="label">
                <span className="label-text">Login Code</span>
              </label>
              <input
                {...register('tenantCode')}
                placeholder="Code"
                className="input-bordered input"
              />
              <button className="btn" onClick={handleSubmit(onEmployeeClick)}>
                I Have A Code
              </button>
            </>
          ) : (
            <>
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                {...register('tenantName')}
                placeholder="We Build Stuff"
                className="input-bordered input"
              />
              <button
                className="btn"
                onClick={() => handleSubmit(onEmployerClick)}
              >
                Submit
              </button>
            </>
          )}
        </form>
      </div>
    </Main>
  );
};

export default NewUser;
