
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
                const { userId, cartItems, totalBill } = req.body;

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
                                },
                                unit_amount: productDetails.price * 100, // Convert price to cents for Stripe
                            },
                            quantity: item.quantity, // Use the quantity from the cart item
                        };
                    })
                );
                // Create Stripe checkout session
                const session = await stripe.checkout.sessions.create({
                    line_items:lineItems,
                    mode:'payment',
                    success_url:`${process.env.FRONTEND_BASE_URL}/login`,
                    cancel_url:`${process.env.FRONTEND_BASE_URL}/signup`
                })
            

                // Redirect the user to the Stripe Checkout page
                res.json({ url: session.url });
            } catch (error) {
                console.error("Error during Stripe checkout:", error);
                res.status(500).json({ message: "Checkout process failed" });
            }
        },
    };
}

module.exports = checkout;
