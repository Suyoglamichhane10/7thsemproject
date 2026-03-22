const express = require('express');
const {
  getProgressStats,
  getWeeklyStudyData,
  getPerformanceData,
  getActivities,
  getStudyStreak,
  updateProgress
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/stats', getProgressStats);
router.get('/weekly', getWeeklyStudyData);
router.get('/performance', getPerformanceData);
router.get('/activities', getActivities);
router.get('/streak', getStudyStreak);
router.post('/', updateProgress);

module.exports = router;