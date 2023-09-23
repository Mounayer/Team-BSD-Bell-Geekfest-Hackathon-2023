const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const CLIENT_DOMAIN = 'http://localhost:3000';

module.exports = async function (req, res) {
    const prices = await stripe.prices.list({
        lookup_keys: [req.body.lookup_key],
        expand: ['data.product'],
      });
      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price: prices.data[0].id,
            // For metered billing, do not pass quantity
            quantity: 1,
    
          },
        ],
        mode: 'subscription',
        success_url: `${CLIENT_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${CLIENT_DOMAIN}?canceled=true`,
      });
    
      res.redirect(303, session.url);
}