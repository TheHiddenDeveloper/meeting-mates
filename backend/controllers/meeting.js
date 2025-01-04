const moment = require('moment-timezone');

let meetings = [];

// Create a new meeting
exports.createMeeting = (req, res, next) => {
    try {
        const { title, date, time, duration, participants } = req.body;

        if (!title || !date || !time || !duration || !participants) {
            throw new Error('All fields are required.');
        }

        const meetingId = meetings.length + 1;
        const meetingTime = moment.tz(`${date} ${time}`, 'YYYY-MM-DD HH:mm', 'UTC').toISOString();

        const meeting = {
            id: meetingId,
            title,
            time: meetingTime,
            duration,
            participants
        };

        meetings.push(meeting);

        // Remove the booked slot from availability
        fetch('/api/availability/remove-slot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: participants[0], slot: meetingTime })
        });

        console.log(`Notification: Meeting '${title}' scheduled with participants ${participants.join(', ')}.`);

        res.status(201).json(meeting);
    } catch (error) {
        next(error);
    }
};

// Update a meeting
exports.updateMeeting = (req, res, next) => {
    try {
        const meetingId = parseInt(req.params.meetingId, 10);
        const { title, date, time, duration, participants } = req.body;

        const meetingIndex = meetings.findIndex(meeting => meeting.id === meetingId);

        if (meetingIndex === -1) {
            throw new Error('Meeting not found.');
        }

        if (!title || !date || !time || !duration || !participants) {
            throw new Error('All fields are required.');
        }

        const oldMeeting = meetings[meetingIndex];
        const meetingTime = moment.tz(`${date} ${time}`, 'YYYY-MM-DD HH:mm', 'UTC').toISOString();

        // Add old slot back to availability
        fetch('/api/availability/add-slot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: oldMeeting.participants[0], slot: oldMeeting.time })
        });

        // Remove new slot from availability
        fetch('/api/availability/remove-slot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: participants[0], slot: meetingTime })
        });

        meetings[meetingIndex] = { id: meetingId, title, time: meetingTime, duration, participants };

        console.log(`Notification: Meeting '${title}' updated with participants ${participants.join(', ')}.`);

        res.json(meetings[meetingIndex]);
    } catch (error) {
        next(error);
    }
};

// Cancel a meeting
exports.deleteMeeting = (req, res, next) => {
    try {
        const meetingId = parseInt(req.params.meetingId, 10);

        const meetingIndex = meetings.findIndex(meeting => meeting.id === meetingId);

        if (meetingIndex === -1) {
            throw new Error('Meeting not found.');
        }

        const [deletedMeeting] = meetings.splice(meetingIndex, 1);

        // Add slot back to availability
        fetch('/api/availability/add-slot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: deletedMeeting.participants[0], slot: deletedMeeting.time })
        });

        console.log(`Notification: Meeting '${deletedMeeting.title}' canceled.`);

        res.status(200).json(deletedMeeting);
    } catch (error) {
        next(error);
    }
};