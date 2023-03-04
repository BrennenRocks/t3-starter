import { type NextApiRequest, type NextApiResponse } from 'next';

import { env } from '@/env/server.mjs';
import { stripe } from '@/server/stripe';

export const config = { api: { bodyParser: false } };
const buffer = async (readable: NextApiRequest) => {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
};

const stripeWebhooks = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const requestBuffer = await buffer(req);
    const signature = req.headers['stripe-signature'] as string;
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        requestBuffer,
        signature,
        env.DEV_STRIPE_WEBHOOK_KEY
      );
    } catch (e) {
      console.error(e);
      res.status(400).send(`Webhook Error`);
      return;
    }

    switch (event.type) {
      case 'subscription.created': {
        const subscription = event.data.object;
        // You can use this to detect changes in the subscription
        // subscription.status will return the current status of the subscription
        //
        // Things you can do here:
        // 1. Send a thank you email to the user
        // 2. Send content you've created that would enhance the user's experience/workflow
        break;
      }

      case 'customer.subscription.deleted':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        // You can use this to detect changes in the subscription
        // subscription.status will return the current status of the subscription
        //
        // Things you can do here:
        // 1. Send an email to the user notifying them about the change in subscription status
        // 2. If the user cancelled the subscription you could trigger
        // a email campaign to inform users of the beneits they're missing out on.
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object;
        // If you have trials, this event is triggered when the trial ended and the user was charged for continued access
        // Things you can do:
        // 1. Notify the user of the charge
        // 2. Thank them for their continued belief in your product
        // 3. Send additional content that could enable better workflows for the user
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        // The payment fails or the user does not have a valid payment method
        // The subscription is now past due
        // You can notify the user that the payment has failed
        // and ask them to use different payment methods
        // or revoke their access
        break;
      }

      default: {
        console.error(`Unhandled Stripe Event: ${event.type}`);
        break;
      }
    }

    res.json({ received: true });
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};

export default stripeWebhooks;
