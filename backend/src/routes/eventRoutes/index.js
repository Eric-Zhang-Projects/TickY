const eventRoutes = require('express').Router();
const all = require('./all');
const filtered = require('./filtered');

eventRoutes.get('/all', all);
eventRoutes.get('/id/:id', filtered.byId);
eventRoutes.get('/artist/:artist', filtered.byArtist);

module.exports = eventRoutes;