const express = require('express');
const router = express.Router();
const { getAvailableSlots, removeSlot, addSlot } = require('../controllers/availability');

router.get('/:userId', getAvailableSlots);
router.post('/remove-slot', removeSlot);
router.post('/add-slot', addSlot);

module.exports = router;