const express = require('express');
const { registerUser, loginUser, refreshAccessToken } = require('../controllers/registerController');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/userlogin').post(loginUser);
router.route('/userrefresh').post(refreshAccessToken);
//router.route('/login').post(userLogin);
module.exports = router;