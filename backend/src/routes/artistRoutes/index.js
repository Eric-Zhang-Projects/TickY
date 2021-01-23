const artistRoutes = require('express').Router();
const artists = require('./artists.js');

artistRoutes.get('/', artists.all);
artistRoutes.get('/:id', artists.byId);

module.exports = artistRoutes;