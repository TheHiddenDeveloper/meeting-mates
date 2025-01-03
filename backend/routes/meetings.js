const express = require('express');
const router = express.Router();
const { createMeeting, updateMeeting, deleteMeeting } = require('../controllers/meeting');

// Create a new meeting
router.post('/', createMeeting);

// Update a meeting
router.put('/:meetingId', updateMeeting);

// Cancel a meeting
router.delete('/:meetingId', deleteMeeting);

module.exports = router;