const eventsDAO = require('./eventsDAO')

const all = async (req, res) => {
  try {
    let allEvents = await eventsDAO.getAllEvents();
    res.json(allEvents);
  } catch (err){
    console.log(err);
  }
};

const byId = async (req, res) => {
  try {
    let eventData = await eventsDAO.getEventById(req.params.id);
    var response = {};
    eventData.forEach(row => {
      if (response.event_id === undefined){
        var lineup = [];
        lineup.push(row.artist_name);
        response = {
          event_id: row.event_id,
          event_name: row.event_name,
          description: row.description,
          date: row.date,
          start_time: row.start_time,
          end_time: row.end_time,
          venue_name: row.venue_name,
          venue_address: row.venue_address,
          venue_location: row.venue_location,
          lineup: lineup
        }
      } else {
        response.lineup.push(row.artist_name);
      }
    });
    res.json(response);
  } catch (err){
    console.log(err);
  }
};

module.exports = {
  all,
  byId,
}