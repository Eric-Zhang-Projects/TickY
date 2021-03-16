const eventRoutes = require('express').Router();
const events = require('./events');
const authentication = require('../../helpers/authentication');

eventRoutes.get('/', authentication.checkAuthenticated, events.all);
eventRoutes.get('/:id', events.byId);

module.exports = eventRoutes;