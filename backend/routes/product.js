const express = require('express');
const { insertProduct, getAllProduct, getProduct, getProductDetails, putProduct, deleteProduct, searchProducts } = require('../controllers/productController');
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const upload = require('../middleware/multer');

router.post('/products', verifyToken(["admin"]), upload.array('images'), insertProduct);
router.get('/products', verifyToken(["admin"]), getAllProduct); // Optional: Add verifyToken if restricted
router.get('/products/search', searchProducts);
router.get('/products/:id', verifyToken(["admin"]), getProduct);
router.get('/productdetails/:url', getProductDetails);
router.patch('/products/:id', verifyToken(["admin"]), upload.array('images'), putProduct);
router.delete('/products/:id', verifyToken(["admin"]), deleteProduct);
module.exports = router;