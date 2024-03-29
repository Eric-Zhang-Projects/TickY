const homeDAO = require('./homeDAO');

/*
Home Page
1. Displays closest events to date.
2. Can click on displayed events to be taken to bidding page
3. can search for other events by name or artist
*/
const soonest = async (req, res) => {
  try {
    if (req.session.passport !== undefined){
    console.log("Current user: " + req.session.passport.user + " auth " + req.isAuthenticated());
    }
    let events = await homeDAO.soonestEvents();
    var response = [];
    events.forEach(row => {
      if (response.find(event => event.event_id === row.event_id) === undefined){
        var lineup = [];
        lineup.push({id: row.artist_id, name: row.artist_name});
        var event = {
          event_id: row.event_id,
          event_name: row.event_name,
          description: row.description,
          date: row.date,
          start_time: row.start_time,
          end_time: row.end_time,
          venue: row.venue_name,
          venue_location: row.venue_location,
          lineup: lineup
        };
        response.push(event);
      } else {
        response.find(event => event.event_id === row.event_id).lineup.push({id: row.artist_id, name: row.artist_name});
      }    
    })

    res.json({user: res.locals.user, response: response});
  } catch (err){
    console.log(err);
  }
};

module.exports = {
    soonest
}