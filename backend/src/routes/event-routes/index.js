const eventRoutes = require('express').Router();
const events = require('./events');

eventRoutes.get('/', events.all);
eventRoutes.get('/:id', events.byId);

module.exports = eventRoutes;