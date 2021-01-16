const events = require('express').Router();
const all = require('./all');
const filtered = require('./filtered');

events.get('/', all);
events.get('/id/:id', filtered.byId);
events.get('/artist/:artist', filtered.byArtist);

module.exports = events;