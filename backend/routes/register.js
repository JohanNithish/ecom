const express = require('express');
const { registerUser, loginUser, refreshAccessToken, getUser } = require('../controllers/registerController');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/userlogin').post(loginUser);
router.route('/userrefresh').post(refreshAccessToken);
router.route('/user/:id').get(getUser);
//router.route('/login').post(userLogin);
module.exports = router;