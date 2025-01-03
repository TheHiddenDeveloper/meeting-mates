const express = require('express');
const bodyParser = require('body-parser');
const meetingsRoutes = require('./routes/meetings');
const availabilityRoutes = require('./routes/availability');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/meetings', meetingsRoutes);
app.use('/users', availabilityRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
