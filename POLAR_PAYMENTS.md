# Polar payments

Vaultgrid sells one lifetime product for exactly **$2.00 USD** through Polar's hosted checkout. Card details never enter this app.

## Live checkout checklist

1. Create or verify a Polar organization and complete its business and payout verification.
2. Create a product named `Vaultgrid Lifetime Access`.
3. Add exactly one **one-time** price: `2.00 USD`. Do not use a recurring price.
4. Create a checkout link for that product.
5. Set the checkout success URL to `https://YOUR_DOMAIN/checkout/success?checkout_id={CHECKOUT_ID}` using Polar's checkout-id placeholder syntax.
6. Add the production variable to the hosting provider, then redeploy:

```env
VITE_POLAR_CHECKOUT_URL=https://polar.sh/your-checkout-link
```

7. Open the deployed site in a clean browser, create a vault, click `Unlock for $2`, complete a real purchase, and confirm Polar returns to `/checkout/success?checkout_id=...`.
8. Check the order in Polar and issue a refund from Polar when testing with a real card.

## Important entitlement limitation

The current app is local-first: the user profile and unlock flag are stored in that browser's local storage. The success page requires a Polar checkout identifier, but it does not yet verify that identifier against Polar's API. This is suitable for a private prototype, not for enforcing paid access in production.

For production enforcement, add a server endpoint that:

1. Receives Polar order or checkout webhooks.
2. Verifies the webhook signature with a server-only Polar secret.
3. Stores the completed order id and customer email in a database.
4. Lets the library query that entitlement after sign-in.
5. Makes the webhook handler idempotent and handles refunds/revocations.

Never put a Polar access token in `VITE_*` variables: Vite exposes those values to every browser.
