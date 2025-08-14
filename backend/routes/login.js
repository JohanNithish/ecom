const express = require('express');
const { adminLogin  } = require('../controllers/loginController');
const router = express.Router();

router.route('/adminlogin').post(adminLogin);
//router.route('/login').post(userLogin);
module.exports = router;