
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/productModel'); // Assuming you have a Product model in your project
const sessionStore = {}; // Store session data in memory (temporary)

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
            const randNum = Math.random().toString(); // Convert to string for comparison
            // console.log('Generated random number:', randNum);

            try {
                const { cartItems, totalBill, email } = req.body;


               
                if (!cartItems || cartItems.length === 0) {
                    return res.status(400).json({ error: "Cart is empty" });
                }

                const lineItems = await Promise.all(
                    cartItems.map(async (item) => {
                        const productDetails = await getProductById(item.productId);
                        const completeProductDetail = `${productDetails.name} - ${item.size} - ${item.color}`;

                        return {
                            price_data: {
                                currency: 'usd',
                                product_data: { name: completeProductDetail },
                                unit_amount: (["S", "M", "L"].includes(item.size) ? 24 : 34) * 100 + 99,
                            },
                            quantity: item.quantity,
                        };
                    })
                );

                lineItems.push({
                    price_data: {
                        currency: 'usd',
                        product_data: { name: "Shipping Charge" },
                        unit_amount: 1099,
                    },
                    quantity: 1,
                });


//    code for pass data to mail api 

req.session.userEmail = { email: email }; // Set session data

req.session.productData = { productData: lineItems }; // Set session data
// console.log("session set")










                // Store randNum in sessionStore (temporary memory storage)
                sessionStore[randNum] = true; 

                const session = await stripe.checkout.sessions.create({
                    line_items: lineItems,
                    mode: 'payment',
                    customer_email: email,
                    shipping_address_collection: { allowed_countries: ['US', 'CA', 'IN'] },
                    phone_number_collection: { enabled: true },
                    success_url: `${process.env.FRONTEND_BASE_URL}/success?session_id=${randNum}`,
                    cancel_url: `${process.env.FRONTEND_BASE_URL}/failed?session_id=${randNum}`,
                });

                // console.log('Random number inside payment:', randNum);
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

                // console.log('Session ID inside getSessionDetails:', session_id);

                if (sessionStore[session_id]) {
                    res.json({ success: true });
                } else {
                    res.json({ success: false });
                }

            } catch (error) {
                console.error("Error retrieving session details:", error);
                res.status(500).json({ message: "Failed to retrieve session details" });
            }
        },

        async getProductSession(req,res)
        {
            if (req.session.userEmail && req.session.productData) {
                res.json({
                    userEmail: req.session.userEmail.email,
                    productData: req.session.productData.productData,
                });
            } else {
                res.status(404).json({ message: "No session data found" });
            }
        }




    };
}



module.exports = checkout;
