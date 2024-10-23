const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController')
const orderController = require('../controllers/orderController')
const authenticateToken = require('../middleware/authenticateToken');
const userAuthenticateToken = require('../controllers/userAuthenticateToken')
const checkout = require('../controllers/checkout')
// Define user routes

// checked routes 
router.post('/signup', authController().postSignup);
router.post('/product/add', productController().addProduct);
router.get('/userId',authenticateToken, userAuthenticateToken().userId) ;
router.get('/cart',authenticateToken, cartController().getcart) ;
router.post('/addtocart',authenticateToken, cartController().addToCart);
router.delete('/cartDelete/:userId', authenticateToken, cartController().deleteItems)
router.post('/deleteproduct', cartController().deleteProduct)
// router.post('/checkout',orderController().confirmOrder)
router.get('/products', productController().getproducts)
router.post('/signin', authController().postSignin);

router.post('/checkout', authenticateToken, checkout().payment)





// define admin routes 
router.post('/product/add', productController().addProduct)



// Correctly export the router
module.exports = router;
