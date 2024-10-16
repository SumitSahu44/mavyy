const ProductModel = require('../models/productModel');
const userModel = require('../models/userModel')
const Cart = require('../models/cartModel')
function cartController()
{
    return {
        async addToCart(req, res) {
            const { userId, productId, quantity } = req.body;
        
            // Debugging: Log the request body and field types
            // console.log('Request body:', req.body);
            // console.log('userId:', userId, 'productId:', productId, 'quantity:', quantity); // This line should work without issues
        
            // Validate input
            if (!userId || !productId || quantity === undefined || quantity <= 0) {
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
        
                // Check if the product already exists in the cart
                const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        
                if (existingProductIndex !== -1) {
                    // If product exists, update the quantity
                    cart.products[existingProductIndex].quantity = Number(cart.products[existingProductIndex].quantity) + Number(quantity);
                } else {
                    // If product does not exist, add it to the cart
                    cart.products.push({ productId, quantity });
                }
        
                // Uncomment if you want to recalculate the total amount
                // Assuming you have a price field in your ProductModel
                // cart.totalAmount = cart.products.reduce((total, item) => {
                //     const productPrice = product.price; // Adjust if needed
                //     return total + productPrice * item.quantity;
                // }, 0);
        
                await cart.save();
                res.json({ message: 'Product added to cart successfully', cart });
            } catch (error) {
                console.error('Backend error while adding product to cart:', error); // Log the exact error
                res.status(500).json({ message: 'Server error', error });
            }
        }
        ,
       async deleteProduct(req,res)
        {
              const {userId, productId} = req.body;

              try {
                // Validate if productId is provided
                if (!productId) {
                    return res.status(400).json({ message: 'Product ID is required' });
                }
        
                // Find the cart for the user
                let cart = await Cart.findOne({ userId });
        
                if (!cart) {
                    return res.status(404).json({ message: 'Cart not found' });
                }
        
                // Check if the product exists in the cart
                const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        
                if (productIndex === -1) {
                    return res.status(404).json({ message: 'Product not found in the cart' });
                }
        
                // Remove the product from the cart
                cart.products.splice(productIndex, 1);
        
                // Recalculate total amount if products array is not empty
                if (cart.products.length > 0) {
                    cart.totalAmount = cart.products.reduce((total, item) => {
                        const productPrice = item.price || 0;
                        return total + productPrice * item.quantity;
                    }, 0);
                } else {
                    cart.totalAmount = 0;
                }
        
                // Save the updated cart
                await cart.save();
        
                res.status(200).json({ message: 'Product removed from cart', cart });
            } catch (error) {
                console.error('Backend error while adding product to cart:', error); // This logs the exact error
                res.status(500).json({ message: 'Server error', error });
            }
        }
    }
}

module.exports = cartController