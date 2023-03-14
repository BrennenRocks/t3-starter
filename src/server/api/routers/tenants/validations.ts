import { z } from 'zod';

export const createTenant = z.object({
  tenantName: z.string().max(20).min(3),
});
