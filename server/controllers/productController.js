const ProductModel = require('../models/productModel');


function product()
{
    return {
       async getproducts(req,res)
        {   
             const { pid } = req.query;  // Destructure pid from req.query
            try {
                let products;
                
                if (pid) {
                    // If pid is provided, find the product with that pid
                    products = await ProductModel.findOne({_id:pid});
                    if (!products) {
                        return res.status(404).json({ message: 'Product not found' });
                    }
                } else {
                    // If no pid is provided, fetch all products
                    products = await ProductModel.find();
                }
        
                res.status(200).json(products);  // Return the products in the response
            }  catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error', error });
            }
        
        }
        ,
       async addProduct(req,res)
        {

            const { name, price, description, category, size, imageUrls } = req.body;

            try {
                // Validate required fields
                if (!name || !price || !description || !category || !size || !imageUrls) {

                    return res.status(400).json({ message: 'Please fill in all required fields' });
                }
        
                // Create a new product
                const newProduct = await ProductModel.create({
                    name,
                    price,
                    description,
                    category,
                    imageUrl,
                    size
            });
        
               res.status(201).json({ message: 'Product added successfully', product: newProduct});
            } catch (error) {
                res.status(500).json({ message: 'Server error', error });
            }
        }
    }
}

module.exports = product;
