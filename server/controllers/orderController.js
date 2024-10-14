const Cart = require('../models/cartModel');
const Order = require('../models/orderModel')
function orderController()
{
    return {
       async confirmOrder(req,res){

          const {userId} = req.body;

            try {
                // Find the user's cart
                let cart = await Cart.findOne({ userId }).populate('products.productId');
        
                if (!cart || cart.products.length === 0) {
                    return res.status(404).json({ message: 'Cart is empty or not found' });
                }
        
                // Create an order based on cart items
                const orderData = {
                    userId,
                    products: cart.products.map(item => ({
                        productId: item.productId._id,
                        quantity: item.quantity,
                        price: item.productId.price
                    })),
                    totalAmount: cart.totalAmount
                };
        
                const newOrder = new Order(orderData);
                await newOrder.save();
        
                // Clear the cart
                cart.products = [];
                cart.totalAmount = 0;
                await cart.save();
        
                // Send back the order information
                res.status(200).json({ message: 'Order placed successfully', order: newOrder });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error', error });
            }
        }
    }
}


module.exports = orderController;