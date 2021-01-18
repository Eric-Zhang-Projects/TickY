const adminRoutes = require('express').Router();
const dbUpdateRoutes = require('./dbUpdatesRoutes');

adminRoutes.use('/dbUpdate', dbUpdateRoutes);

module.exports = adminRoutes;
