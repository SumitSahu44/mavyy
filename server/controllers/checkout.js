const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function checkout() {
    return {
        async payment(req, res) {
            try {
                const { userId, cartItems, totalBill } = req.body;

                // Ensure cartItems array exists and has data
                if (!cartItems || cartItems.length === 0) {
                    return res.status(400).json({ error: "Cart is empty" });
                }

                // Convert cartItems to Stripe-compatible line_items format
                const lineItems = cartItems.map(item => ({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.productId, // Use dynamic product name from the cart item
                        },
                        unit_amount: 36 * 100, // Price in cents (Stripe requires this)
                    },
                    quantity: item.quantity, // Use the dynamic quantity from the cart
                }));

                // Create Stripe checkout session
                const session = await stripe.checkout.sessions.create({
                    line_items: lineItems, // Use dynamically generated line items
                    mode: 'payment',
                    success_url: `${process.env.FRONTEND_BASE_URL}/login`, // Use your success URL
                    cancel_url: `${process.env.FRONTEND_BASE_URL}/cancel`,   // Use your cancel URL
                });

                // Redirect the user to the Stripe Checkout page
                res.redirect(session.url);
            } catch (error) {
                console.error("Error during Stripe checkout:", error);
                res.status(500).json({ message: "Checkout process failed" });
            }
        },
    };
}

module.exports = checkout;
