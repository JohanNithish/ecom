const express = require('express');
const { adminLogin, refreshAccessToken } = require('../controllers/loginController');
const router = express.Router();

router.route('/adminlogin').post(adminLogin);
router.route('/refresh-token').post(refreshAccessToken);


//router.route('/login').post(userLogin);
module.exports = router;