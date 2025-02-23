
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
        const randNum = Math.random();
     
    return {

        
        async payment(req, res) {
            try {
                const { cartItems, totalBill, email } = req.body;

                // Ensure cartItems exist
                if (!cartItems || cartItems.length === 0) {
                    return res.status(400).json({ error: "Cart is empty" });
                }

                // Convert cartItems to Stripe-compatible format
                const lineItems = await Promise.all(
                    cartItems.map(async (item) => {
                        const productDetails = await getProductById(item.productId);
                        
                        var completeProductDetail = `${productDetails.name} - ${item.size} - ${item.color}`  ;
                        
                        return {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: completeProductDetail,
                                   
                                },
                                unit_amount: (["S", "M", "L"].includes(item.size) ? 24 : 34) * 100 + 99,
                            },
                            quantity: item.quantity,
                        };
                    })
                );

                // Add shipping charge
                lineItems.push({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: "Shipping Charge",
                        },
                        unit_amount: 1099,
                    },
                    quantity: 1,
                });
                       
              
                // Create Stripe checkout session with phone number collection
                const session = await stripe.checkout.sessions.create({
                    line_items: lineItems,
                    mode: 'payment',
                    customer_email: email, // ✅ Pre-fill the email
                    shipping_address_collection: {
                        allowed_countries: ['US', 'CA', 'IN'],
                    },
                    phone_number_collection: { enabled: true }, // ✅ Enable phone number collection
                    success_url: `${process.env.FRONTEND_BASE_URL}/success?session_id=${randNum}`, // Temporary placeholder
                    cancel_url: `${process.env.FRONTEND_BASE_URL}/failed?session_id=${randNum}`,
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

                // Retrieve session details from Stripe
                 if(session_id === randNum)
                {
                    res.json({
                          success: true
                    });
                }else{
                    res.json({
                        success: false
                    });
                }

                
              
            } catch (error) {
                console.error("Error retrieving session details:", error);
                res.status(500).json({ message: "Failed to retrieve session details" });
            }
        }
    };
}



module.exports = checkout;
