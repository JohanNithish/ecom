const express = require('express');
const { addcheckout, getOrders, getAllOrders } = require('../controllers/checkoutController');
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

router.route('/checkout').post(verifyToken(["user"]), addcheckout);
router.route('/orders/:userId').get(verifyToken(["user"]), getOrders);
router.route('/orders').get(verifyToken(["admin"]), getAllOrders);
module.exports = router;