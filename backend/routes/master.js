const express = require('express');
const { insertCategory, getAllCategory , putCategory, deleteCategory } = require('../controllers/masterController');
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

router.route('/master')
  .post(verifyToken, insertCategory)
  .get(verifyToken, getAllCategory);

router.route('/master/:id')
  .put(verifyToken, putCategory)
  .delete(verifyToken, deleteCategory);
module.exports = router;