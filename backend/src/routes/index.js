const routes = require('express').Router();
const events = require('./events');

routes.get('/', (req, res) => {
    res.json("home page");
})

routes.use('/api/events', events);

module.exports = routes;