const dbUpdateRoutes = require('express').Router();
const edmTrain = require('./edmTrain.js');
const cleanDb = require('./cleanDb.js');

dbUpdateRoutes.get('/edmtrain', edmTrain.onboardNewEvents);
dbUpdateRoutes.get('/cleanDb', cleanDb.clean);



/*
1. /edmtrain - calls Edmtrain API and for each new event: adds event, artist, venue, and event_artist
2. cleandb - removes all events before current date + removes deleted events from event_artist

To do:
3. /cleanauction - removes all expiring auctions + their bids + user_ticket_event_auction(?)


*/

module.exports = dbUpdateRoutes;