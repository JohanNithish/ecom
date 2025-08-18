const express = require('express');
const { insertProduct, getAllProduct, getProduct, getProductDetails, putProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const upload = require('../middleware/multer');

router.post('/products', verifyToken, upload.array('images'), insertProduct);
router.get('/products', verifyToken, getAllProduct); // Optional: Add verifyToken if restricted
router.get('/products/:id', verifyToken, getProduct);
router.get('/productdetails/:url', getProductDetails);
router.patch('/products/:id', verifyToken, upload.array('images'), putProduct);
router.delete('/products/:id', verifyToken, deleteProduct);

module.exports = router;