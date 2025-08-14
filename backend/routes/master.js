const express = require('express');
const { insertCategory, getAllCategory , putCategory, deleteCategory } = require('../controllers/masterController');
const router = express.Router();

router.route('/master').post(insertCategory);
router.route('/master').get(getAllCategory);
router.route('/master/:id').put(putCategory);
router.route('/master/:id').delete(deleteCategory);
module.exports = router;