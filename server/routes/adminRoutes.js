const express = require('express');
const {
  getAdminStats,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getReports,
  // Import feedback controllers (you need to create these)
  getAllFeedback,
  getFeedbackById,
  deleteFeedback,
  markFeedbackAsRead,
  replyToFeedback
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All admin routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

// Stats and Reports
router.get('/admin/stats', getAdminStats);
router.get('/admin/reports', getReports);

// User Management
router.get('/admin/users', getAllUsers);
router.get('/admin/users/:id', getUserById);
router.put('/admin/users/:id', updateUser);
router.delete('/admin/users/:id', deleteUser);

// Feedback Management (add these routes)
router.get('/admin/feedback', getAllFeedback);
router.get('/admin/feedback/:id', getFeedbackById);
router.delete('/admin/feedback/:id', deleteFeedback);
router.patch('/admin/feedback/:id/read', markFeedbackAsRead);
router.post('/admin/feedback/:id/reply', replyToFeedback);

module.exports = router;