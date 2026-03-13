const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  studyHours: Number,
  topicsCompleted: Number,
  quizScores: [
    {
      subject: String,
      score: Number,
    },
  ],
});

module.exports = mongoose.model('Progress', ProgressSchema);