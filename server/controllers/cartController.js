const ProductModel = require('../models/productModel');
const userModel = require('../models/userModel')
const Cart = require('../models/cartModel')
function cartController()
{
    return {
        async addToCart(req, res) {
            const { productId, quantity, size, color } = req.body;
            const userId = req.user.userId; // Extract userId from the decoded token

        
            // Debugging: Log the request body and field types
            // console.log('Request body:', req.body);
            // console.log('userId:', userId, 'productId:', productId, 'quantity:', quantity); // This line should work without issues
        
            // Validate inputs
            if (!userId || !productId || quantity === undefined || !size || !color  || quantity <= 0) {
                return res.status(400).json({ error: 'All fields are required and quantity must be greater than 0' });
            }
        
            try {
                // Find the product and user
                const product = await ProductModel.findById(productId);
                const user = await userModel.findById(userId);
        
                // Check if user and product exist
                if (!user || !product) {
                    return res.status(404).json({ message: 'User or Product not found' });
                }
        
                // Check if user already has a cart
                let cart = await Cart.findOne({ userId });
        
                // If no cart exists for the user, create one
                if (!cart) {
                    cart = new Cart({
                        userId,
                        products: [],
                        totalAmount: 0
                    });
                }
        
                    // Check if the product with the specific size already exists in the cart
                    const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productId && p.size === size && p.color === color);
            
                    if (existingProductIndex !== -1) {
                        // If product exists, update the quantity for the specific size
                        cart.products[existingProductIndex].quantity += Number(quantity);
                    } else {
                        // If product does not exist with that size, add it to the cart
                        cart.products.push({ productId, quantity, size, color });
                    }
        
             
        
                await cart.save();
                res.json({ message: 'Product added to cart successfully', cart });
            } catch (error) {
                console.error('Backend error while adding product to cart:', error); // Log the exact error
                res.status(500).json({ message: 'Server error', error });
            }
        }
        ,
        async getcart(req,res)
        {
            try {
                const userId = req.user.userId; // Get the userId from cookies
                if (!userId) {
                  return res.status(400).json({ message: "UserId is missing" });
                }
            
                // Find the cart by userId
                const cart = await Cart.findOne({ userId });
                if (!cart) {
                  return res.status(404).json({ message: "Cart not found for this user" });
                }
          
                // Return the cart details
                res.json(cart.products);
              } catch (error) {
                console.error("Error fetching cart details:", error);
                res.status(500).json({ message: "Internal server error" });
              }
            
        },
       async deleteItems(req,res)
        { 
        

              const {pid} = req.query;
              const userId = req.user.userId; // Get the userId from cookies
            
                try {
                // Validate if productId is provided
                if (!pid) {
                    return res.status(400).json({ message: 'Product ID is required' });
                }
        
                // Find the cart for the user
                let cart = await Cart.findOne({ userId });
        
                if (!cart) {
                    return res.status(404).json({ message: 'Cart not found' });
                }
        
                // Check if the product exists in the cart
                const productIndex = cart.products.findIndex(p => p._id.toString() === pid);
        
                if (productIndex === -1) {
                    return res.status(404).json({ message: 'Product not found in the cart' });
                }
        
                // Remove the product from the cart
                cart.products.splice(productIndex, 1);
        
                await cart.save();
              
                const cartData = await Cart.findOne({ userId });
                if (!cartData) {
                  return res.status(404).json({ message: "Cart not found for this user" });
                }
                 console.log(cartData.products)
                res.json(cartData.products);
               
                // res.status(200).json({ message: 'Product removed from cart', cart.products });
            } catch (error) {
                console.error('Backend error while adding product to cart:', error); // This logs the exact error
                res.status(500).json({ message: 'Server error', error });
            }
        },
   // Add this function to your cart controller
        async clearCart(req,res) {
            try {
                // Assuming you have a Cart model in MongoDB
                const userId = req.user.userId; // Get the userId from cookies
            
                await Cart.deleteMany({ userId });
                console.log(`Cart cleared for user: ${userId}`);
            } catch (error) {
                console.error("Error clearing cart:", error);
            }
        }



      
    }
}

module.exports = cartController
