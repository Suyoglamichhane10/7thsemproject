const Subject = require('../models/Subject');
const Progress = require('../models/Progress');
const Activity = require('../models/Activity');

// @desc    Get progress stats
// @route   GET /api/progress/stats
// @access  Private
const getProgressStats = async (req, res) => {
  try {
    const subjects = await Subject.find({ user: req.user.id });
    
    const totalSubjects = subjects.length;
    const completedSubjects = subjects.filter(s => s.completed).length;
    const totalHours = subjects.reduce((acc, s) => acc + (s.hoursPerDay || 0), 0);
    
    res.json({
      totalSubjects,
      completedSubjects,
      totalHours,
      completionRate: totalSubjects ? (completedSubjects / totalSubjects) * 100 : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get weekly study hours
// @route   GET /api/progress/weekly
// @access  Private
const getWeeklyStudyData = async (req, res) => {
  try {
    // Get study logs from Progress model
    const weeklyLogs = await Progress.aggregate([
      { $match: { user: req.user._id } },
      { $group: {
        _id: { $dayOfWeek: '$date' },
        hours: { $sum: '$studyHours' }
      }},
      { $sort: { '_id': 1 } }
    ]);
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyData = days.map((day, index) => ({
      day,
      hours: weeklyLogs.find(log => log._id === index)?.hours || 0
    }));
    
    res.json(weeklyData);
  } catch (error) {
    // Return mock data if no logs exist
    res.json([
      { day: 'Mon', hours: 0 },
      { day: 'Tue', hours: 0 },
      { day: 'Wed', hours: 0 },
      { day: 'Thu', hours: 0 },
      { day: 'Fri', hours: 0 },
      { day: 'Sat', hours: 0 },
      { day: 'Sun', hours: 0 },
    ]);
  }
};

// @desc    Get performance/quiz data
// @route   GET /api/progress/performance
// @access  Private
const getPerformanceData = async (req, res) => {
  try {
    // Get quiz scores from Progress model
    const quizScores = await Progress.aggregate([
      { $match: { user: req.user._id } },
      { $unwind: '$quizScores' },
      { $project: {
        week: { $week: '$date' },
        score: '$quizScores.score'
      }},
      { $group: {
        _id: '$week',
        avgScore: { $avg: '$score' }
      }},
      { $sort: { '_id': 1 } },
      { $limit: 6 }
    ]);
    
    const performanceData = quizScores.map((item, index) => ({
      week: `W${item._id}`,
      score: Math.round(item.avgScore)
    }));
    
    res.json(performanceData);
  } catch (error) {
    // Return placeholder if no data
    res.json([
      { week: 'W1', score: 0 },
      { week: 'W2', score: 0 },
    ]);
  }
};

// @desc    Get recent activities
// @route   GET /api/progress/activities
// @access  Private
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json(activities);
  } catch (error) {
    res.json([]);
  }
};

// @desc    Get study streak
// @route   GET /api/progress/streak
// @access  Private
const getStudyStreak = async (req, res) => {
  try {
    const logs = await Progress.find({ user: req.user._id })
      .sort({ date: -1 });
    
    let streak = 0;
    const today = new Date().setHours(0,0,0,0);
    
    for (let i = 0; i < logs.length; i++) {
      const logDate = new Date(logs[i].date).setHours(0,0,0,0);
      const expectedDate = today - (i * 86400000);
      
      if (logDate === expectedDate) {
        streak++;
      } else {
        break;
      }
    }
    
    res.json({ streak });
  } catch (error) {
    res.json({ streak: 0 });
  }
};

// @desc    Update progress after study session
// @route   POST /api/progress
// @access  Private
const updateProgress = async (req, res) => {
  try {
    const { studyHours, topicsCompleted, quizScore } = req.body;
    const today = new Date().setHours(0,0,0,0);
    
    let progress = await Progress.findOne({ 
      user: req.user._id,
      date: today 
    });
    
    if (progress) {
      progress.studyHours += studyHours || 0;
      progress.topicsCompleted += topicsCompleted || 0;
      if (quizScore) {
        progress.quizScores.push({ score: quizScore });
      }
      await progress.save();
    } else {
      progress = await Progress.create({
        user: req.user._id,
        date: today,
        studyHours: studyHours || 0,
        topicsCompleted: topicsCompleted || 0,
        quizScores: quizScore ? [{ score: quizScore }] : []
      });
    }
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProgressStats,
  getWeeklyStudyData,
  getPerformanceData,
  getActivities,
  getStudyStreak,
  updateProgress
};