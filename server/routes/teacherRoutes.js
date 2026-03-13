const express = require('express');
const {
  getTeacherDashboard,
  getStudents,
} = require('../controllers/teacherController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/dashboard', protect, authorize('teacher'), getTeacherDashboard);
router.get('/students', protect, authorize('teacher'), getStudents);

module.exports = router;