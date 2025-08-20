const express = require('express');
const { insertCategory, getAllCategory , putCategory, deleteCategory } = require('../controllers/masterController');
const { insertDeal, getAllDeal , putDeal, deleteDeal } = require('../controllers/dealmasterController');
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

router.route('/master')
  .post(verifyToken(["admin"]), insertCategory)
  .get(getAllCategory);

router.route('/master/:id')
  .put(verifyToken(["admin"]), putCategory)
  .delete(verifyToken(["admin"]), deleteCategory);


  router.route('/dealmaster')
  .post(verifyToken(["admin"]), insertDeal)
  .get(verifyToken(["admin"]), getAllDeal);

router.route('/dealmaster/:id')
  .put(verifyToken(["admin"]), putDeal)
  .delete(verifyToken(["admin"]), deleteDeal);
module.exports = router;