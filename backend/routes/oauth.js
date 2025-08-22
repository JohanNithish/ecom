const express = require('express');
const { oauthLogin } = require('../controllers/oauthController');
const router = express.Router();

router.route('/oauth').post(oauthLogin);

module.exports = router;