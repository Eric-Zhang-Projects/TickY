const artistRoutes = require('express').Router();
const artists = require('./artists.js');
const authentication = require('../../helpers/authentication.js');

artistRoutes.get('/', authentication.allAllowed, artists.all);
artistRoutes.get('/:id', authentication.allAllowed, artists.byId);

module.exports = artistRoutes;