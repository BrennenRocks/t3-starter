import { createTRPCRouter, protectedProcedure } from '../../trpc';
import { createTenant } from './validations';

export const tenantRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createTenant)
    .mutation(async ({ input, ctx }) =>
      ctx.prisma.tenant.create({
        data: {
          name: input.tenantName,
          users: {
            connect: { id: ctx.session.user.id },
          },
        },
      })
    ),
});
