const homeRoutes = require('express').Router();
const home = require('./home.js');

homeRoutes.get('/', home.soonest);

module.exports = homeRoutes;