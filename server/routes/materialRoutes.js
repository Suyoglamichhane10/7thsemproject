const express = require('express');
const {
  getMaterials,
  createMaterial,
  deleteMaterial,
} = require('../controllers/materialController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getMaterials) // public
  .post(protect, authorize('teacher'), createMaterial);

router.delete('/:id', protect, authorize('teacher'), deleteMaterial);

module.exports = router;