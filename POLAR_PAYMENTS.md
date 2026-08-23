# Polar payments

Vaultgrid uses a Polar-hosted checkout for one lifetime purchase of **$2 USD**. The app does not collect card details and no Polar secret is exposed to the browser.

## Live setup

1. In Polar, create a product named `Vaultgrid Lifetime Access` with one one-time price of exactly `$2.00 USD`.
2. Create a checkout link for that product and set its success/return URL to `https://YOUR_DOMAIN/checkout/success`.
3. Set `VITE_POLAR_CHECKOUT_URL` to that checkout link in the production environment.
4. Deploy the app and complete a real test purchase from the deployed domain.

Example:

```env
VITE_POLAR_CHECKOUT_URL=https://polar.sh/your-checkout-link
```

The success route grants the existing local-first unlock after Polar returns the customer. Access is intentionally device-local because this project currently has no account database or server session. For multi-device entitlement enforcement, add a Polar webhook endpoint that verifies completed orders and stores the customer entitlement server-side before replacing the local grant.
