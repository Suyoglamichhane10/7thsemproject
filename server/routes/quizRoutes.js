const express = require('express');
const {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuizAttempt,
  getUserAttempts,
  getAttemptDetails,
  getQuizStats,
  getTeacherQuizzes,
} = require('../controllers/quizController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Student routes
router.get('/', getQuizzes);
router.get('/attempts', getUserAttempts);
router.get('/attempts/:attemptId', getAttemptDetails);
router.get('/:id', getQuizById);
router.post('/:id/attempt', submitQuizAttempt);

// Teacher/Admin routes
router.post('/', authorize('teacher', 'admin'), createQuiz);
router.get('/teacher/quizzes', authorize('teacher', 'admin'), getTeacherQuizzes);
router.get('/:id/stats', authorize('teacher', 'admin'), getQuizStats);
router.put('/:id', authorize('teacher', 'admin'), updateQuiz);
router.delete('/:id', authorize('teacher', 'admin'), deleteQuiz);

module.exports = router;