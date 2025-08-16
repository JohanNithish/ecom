const express = require('express');
const { insertProduct, getAllProduct, putProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const upload = require('../middleware/multer');

router.post('/products', verifyToken, upload.array('images'), insertProduct);
router.get('/products', getAllProduct); // Optional: Add verifyToken if restricted
router.put('/products/:id', verifyToken, upload.array('images'), putProduct);
router.delete('/products/:id', verifyToken, deleteProduct);

module.exports = router;