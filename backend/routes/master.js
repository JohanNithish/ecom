const express = require('express');
const { insertCategory, getAllCategory , putCategory, deleteCategory } = require('../controllers/masterController');
const { insertDeal, getAllDeal , putDeal, deleteDeal } = require('../controllers/dealmasterController');
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

router.route('/master')
  .post(verifyToken, insertCategory)
  .get(verifyToken, getAllCategory);

router.route('/master/:id')
  .put(verifyToken, putCategory)
  .delete(verifyToken, deleteCategory);


  router.route('/dealmaster')
  .post(verifyToken, insertDeal)
  .get(verifyToken, getAllDeal);

router.route('/dealmaster/:id')
  .put(verifyToken, putDeal)
  .delete(verifyToken, deleteDeal);
module.exports = router;