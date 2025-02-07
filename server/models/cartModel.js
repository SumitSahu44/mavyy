const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number,
        size: String,
        color: String 
    }],
    totalAmount: Number
});

module.exports = mongoose.model('Cart', CartSchema);
