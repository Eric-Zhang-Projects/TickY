const eventRoutes = require('express').Router();
const events = require('./events');
const authentication = require('../../helpers/authentication');

eventRoutes.get('/', authentication.allAllowed, events.all);
eventRoutes.get('/:id', authentication.allAllowed, events.byId);

module.exports = eventRoutes;