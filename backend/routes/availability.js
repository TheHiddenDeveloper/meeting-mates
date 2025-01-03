const express = require('express');
const router = express.Router();
const { getAvailableSlots } = require('../controllers/availability');

// Fetch available time slots for a user
router.get('/:userId/available-slots', getAvailableSlots);

module.exports = router;
