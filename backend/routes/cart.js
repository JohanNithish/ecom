const express = require('express');
const { addCart, getCart, mergeCart, ChangeCart } = require('../controllers/cartController');
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

router.route('/cart').post(verifyToken(["user"]), addCart);
router.route('/cart').get(verifyToken(["user"]), getCart);
router.route('/cart/merge').post(verifyToken(["user"]), mergeCart);
router.route('/cart/change').post(verifyToken(["user"]), ChangeCart);
// router.route('/wishlist').post(addWishlist);
// router.route('/wishlist').get(getWishlist);
module.exports = router;