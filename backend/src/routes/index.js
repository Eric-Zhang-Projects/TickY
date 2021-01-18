const routes = require('express').Router();
const eventRoutes = require('./eventRoutes');
const homeRoutes = require('./homeRoutes');

routes.use('/', homeRoutes);

routes.use('/events', eventRoutes);

module.exports = routes;