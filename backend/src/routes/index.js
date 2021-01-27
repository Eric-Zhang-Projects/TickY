const routes = require('express').Router();
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const artistRoutes = require('./artistRoutes');

routes.use('/', homeRoutes);

routes.use('/', userRoutes);

routes.use('/events', eventRoutes);

routes.use('/artists', artistRoutes);

/*

User routes
POST /login
POST /register
GET /logout
GET /account
POST /updateAccount
GET /forgotpassword

Home routes
GET / (return list of soon events)
GET /search?query= (artist or event name)

Event routes
GET /events
GET /events/{id} (shows auctions)

artist routes
GET /artists
GET /artists/{id} (shows events)

auction routes
GET /auctions shows all auctions (ordered by recent)
GET /auctions/{id} shows one auction


*/

module.exports = routes;