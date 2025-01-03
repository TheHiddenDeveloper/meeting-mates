const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// GET /api/meetings - Get all meetings for a user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const userMeetings = global.meetings.filter(
    meeting => meeting.participants.freelancerId === userId || 
               meeting.participants.clientId === userId
  );
  console.log(`Fetched meetings for user ${userId}:`, userMeetings);
  res.json(userMeetings);
});

// POST /api/meetings - Create a new meeting
router.post('/', (req, res) => {
  const { title, description, startTime, duration, participants } = req.body;
  
  // Validate required fields
  if (!title || !startTime || !duration || !participants) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newMeeting = {
    id: uuidv4(),
    title,
    description,
    startTime: new Date(startTime),
    duration,
    participants,
    status: 'scheduled'
  };

  global.meetings.push(newMeeting);
  console.log('New meeting created:', newMeeting);
  
  // Mock notification
  console.log(`Notification: New meeting "${title}" scheduled for ${startTime}`);
  
  res.status(201).json(newMeeting);
});

// PUT /api/meetings/:meetingId - Update a meeting
router.put('/:meetingId', (req, res) => {
  const { meetingId } = req.params;
  const updateData = req.body;
  
  const meetingIndex = global.meetings.findIndex(m => m.id === meetingId);
  
  if (meetingIndex === -1) {
    return res.status(404).json({ error: 'Meeting not found' });
  }

  const updatedMeeting = {
    ...global.meetings[meetingIndex],
    ...updateData,
    startTime: new Date(updateData.startTime || global.meetings[meetingIndex].startTime)
  };

  global.meetings[meetingIndex] = updatedMeeting;
  console.log('Meeting updated:', updatedMeeting);
  
  // Mock notification
  console.log(`Notification: Meeting "${updatedMeeting.title}" has been updated`);
  
  res.json(updatedMeeting);
});

// DELETE /api/meetings/:meetingId - Cancel a meeting
router.delete('/:meetingId', (req, res) => {
  const { meetingId } = req.params;
  
  const meetingIndex = global.meetings.findIndex(m => m.id === meetingId);
  
  if (meetingIndex === -1) {
    return res.status(404).json({ error: 'Meeting not found' });
  }

  const canceledMeeting = global.meetings[meetingIndex];
  global.meetings.splice(meetingIndex, 1);
  
  console.log('Meeting canceled:', canceledMeeting);
  
  // Mock notification
  console.log(`Notification: Meeting "${canceledMeeting.title}" has been canceled`);
  
  res.json({ message: 'Meeting canceled successfully' });
});

// GET /api/meetings/available-slots/:userId - Get available time slots
router.get('/available-slots/:userId', (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;
  
  // Mock available slots generation
  const slots = [];
  const baseDate = date ? new Date(date) : new Date();
  baseDate.setHours(9, 0, 0, 0); // Start at 9 AM
  
  // Generate 30-minute slots between 9 AM and 5 PM
  for (let i = 0; i < 16; i++) {
    const slotTime = new Date(baseDate);
    slotTime.setMinutes(baseDate.getMinutes() + (i * 30));
    
    // Check if slot conflicts with existing meetings
    const isAvailable = !global.meetings.some(meeting => {
      const meetingStart = new Date(meeting.startTime);
      const meetingEnd = new Date(meetingStart.getTime() + meeting.duration * 60000);
      return slotTime >= meetingStart && slotTime < meetingEnd;
    });
    
    if (isAvailable) {
      slots.push(slotTime);
    }
  }
  
  console.log(`Generated available slots for user ${userId}:`, slots);
  res.json(slots);
});

module.exports = router;