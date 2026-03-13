const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Placeholder for user profile update, etc.
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;