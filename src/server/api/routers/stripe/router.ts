import type Stripe from 'stripe';
import { createTRPCRouter, protectedProcedure } from '../../trpc';
import { cancelSubscription, createSubscription } from './validations';

export const stripeRouter = createTRPCRouter({
  createSubscription: protectedProcedure
    .input(createSubscription)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const customer = await ctx.stripe.customers.create({
        email: user.email,
        name: user.name,
      });

      const subscription = await ctx.stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: input.priceId }],
        payment_behavior: 'default_incomplete',
        metadata: {
          appUserId: user.id,
        },
        expand: ['latest_invoice.payment_intent'],
      });

      const clientSecret = (
        (subscription.latest_invoice as Stripe.Invoice)
          .payment_intent as Stripe.PaymentIntent
      ).client_secret;

      await ctx.prisma.tenant.update({
        where: {
          id: user.tenantId,
        },
        data: {
          subscriptionActive: true,
          stripeCustomerId: customer.id,
          stripeSubId: subscription.id,
        },
      });

      return { subscriptionId: subscription.id, clientSecret };
    }),
  cancelSubscription: protectedProcedure
    .input(cancelSubscription)
    .mutation(async ({ ctx, input }) =>
      ctx.stripe.subscriptions.del(input.subscriptionId)
    ),
});
