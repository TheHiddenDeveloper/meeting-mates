let userAvailability = {
    "1": ["2025-01-10T10:00:00Z", "2025-01-10T11:00:00Z", "2025-01-10T13:00:00Z"],
    "2": ["2025-01-10T10:30:00Z", "2025-01-10T12:00:00Z", "2025-01-10T14:00:00Z"]
};

// Fetch available time slots for a user
exports.getAvailableSlots = (req, res, next) => {
    try {
        const userId = req.params.userId;

        if (!userAvailability[userId]) {
            throw new Error('User not found.');
        }

        res.json({ availableSlots: userAvailability[userId] });
    } catch (error) {
        next(error);
    }
};
