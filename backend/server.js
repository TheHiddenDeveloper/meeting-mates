const express = require('express');
const cors = require('cors');
const meetingsRouter = require('./routes/meetings');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/meetings', meetingsRouter);

// In-memory database simulation
global.meetings = [];
global.availableSlots = {};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});