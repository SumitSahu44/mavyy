// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    size:{
        type: Array,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
