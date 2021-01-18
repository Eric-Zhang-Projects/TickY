const dbUpdateRoutes = require('express').Router();
const edmTrain = require('./edmTrain.js');

dbUpdateRoutes.get('/edmtrain', edmTrain.onboardNewEvents);

module.exports = dbUpdateRoutes;