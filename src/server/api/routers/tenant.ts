import { createTRPCRouter, protectedProcedure } from '../trpc';

export const tenantRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) =>
    ctx.prisma.tenant.create({
      data: {
        name: 'My New Tenant',
        users: {
          connect: { id: ctx.session.user.id },
        },
      },
    })
  ),
});
