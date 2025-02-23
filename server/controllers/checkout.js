
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/productModel'); // Assuming you have a Product model in your project

async function getProductById(productId) {
    try {
        // Find the product by productId in your MongoDB
        const product = await Product.findById(productId);
        
        // Check if the product exists
        if (!product) {
            throw new Error('Product not found');
        }
        
        // Return product details
        return {
            name: product.name,
            price: product.price, // Assuming price is in dollars
        };
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        throw error; // Re-throw the error to handle it in the payment function
    }
}


function checkout() {
    return {
        async payment(req, res) {
            try {
                const { cartItems, totalBill } = req.body;

                // Ensure cartItems array exists and has data
                if (!cartItems || cartItems.length === 0) {
                    return res.status(400).json({ error: "Cart is empty" });
                }

                // Convert cartItems to Stripe-compatible line_items format
                const lineItems = await Promise.all(
                    cartItems.map(async (item) => {
                        // Fetch product details from the database
                        const productDetails = await getProductById(item.productId);

                        return {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: productDetails.name, // Use product name from DB
                                    metadata: {
                                        size: item.size,   // Passing size
                                        color: item.color, // Passing color
                                    }
                                },
                                unit_amount: (["S", "M", "L"].includes(item.size) ? 24 : 34) * 100 + 99, // Set price based on size and ensure .99
                            },
                            quantity: item.quantity, // Use the quantity from the cart item
                        };
                    })
                );

                // Add shipping charge as a separate line item
                lineItems.push({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: "Shipping Charge",
                        },
                        unit_amount: 1099, // $10.99 shipping charge
                    },
                    quantity: 1,
                });

                // Create Stripe checkout session with shipping address collection enabled
                const session = await stripe.checkout.sessions.create({
                    line_items: lineItems,
                    mode: 'payment',
                    shipping_address_collection: {
                        allowed_countries: ['US', 'CA', 'IN'], // Add more countries if needed
                    },
                    success_url: `${process.env.FRONTEND_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${process.env.FRONTEND_BASE_URL}/cart`
                });

                res.json({ url: session.url });
            } catch (error) {
                console.error("Error during Stripe checkout:", error);
                res.status(500).json({ message: "Checkout process failed" });
            }
        },

        async getSessionDetails(req, res) {
            try {
                const { session_id } = req.query;

                if (!session_id) {
                    return res.status(400).json({ error: "Session ID is required" });
                }

                const session = await stripe.checkout.sessions.retrieve(session_id);

                res.json({
                    customer_email: session.customer_details.email,
                    shipping_address: session.shipping_details.address
                });
            } catch (error) {
                console.error("Error retrieving session details:", error);
                res.status(500).json({ message: "Failed to retrieve session details" });
            }
        }
    };
}


module.exports = checkout;
