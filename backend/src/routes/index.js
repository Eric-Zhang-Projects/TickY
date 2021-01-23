const routes = require('express').Router();
const homeRoutes = require('./homeRoutes');
const eventRoutes = require('./eventRoutes');
const artistRoutes = require('./artistRoutes');

routes.use('/', homeRoutes);

routes.use('/events', eventRoutes);

routes.use('/artists', artistRoutes);

/*
Home routes
GET / (return list of soon events)
GET /search?query= (artist or event name)

Event routes
GET /events
GET /events/{id} (shows auctions)

artist routes
GET /artists
GET /artists/{id} (shows events)


*/

module.exports = routes;