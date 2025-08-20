const express = require('express');
const { addWishlist, getWishlist, mergeWishlist } = require('../controllers/wishlistController');
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

router.route('/wishlist').post(verifyToken(["user"]), addWishlist);
router.route('/wishlist').get(verifyToken(["user"]), getWishlist);
router.route('/wishlist/merge').post(verifyToken(["user"]), mergeWishlist);
// router.route('/wishlist').post(addWishlist);
// router.route('/wishlist').get(getWishlist);
module.exports = router;