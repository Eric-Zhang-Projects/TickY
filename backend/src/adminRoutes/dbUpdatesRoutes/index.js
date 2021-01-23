const dbUpdateRoutes = require('express').Router();
const edmTrain = require('./edmTrain.js');
const cleanDb = require('./cleanDb.js');

dbUpdateRoutes.get('/edmtrain', edmTrain.onboardNewEvents);
dbUpdateRoutes.get('/cleanDb', cleanDb.clean);

module.exports = dbUpdateRoutes;