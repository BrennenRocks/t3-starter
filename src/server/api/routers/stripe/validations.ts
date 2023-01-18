import { z } from "zod";

export const createSubscription = z.object({
  priceId: z.string(),
});

export const cancelSubscription = z.object({
  subscriptionId: z.string(),
});
