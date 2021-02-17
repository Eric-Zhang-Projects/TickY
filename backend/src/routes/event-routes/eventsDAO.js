const pool = require('../../db')

async function getAllEvents() {
    try {
        const events = await pool.query('select * from event');
        return events.rows;
      } catch (err) {
        console.log(err.message);
      }
}

async function getEventById(id) {
    const query = 
    'select\n' +
    'e.id event_id, e.name event_name, e.description, e.date, e.start_time, e.end_time,\n' +
    'v.name venue_name, v.address venue_address, v.location venue_location,\n' +
    'a.name artist_name\n' +
    'from event e\n' +
    'left join event_artist ea on e.id = ea.event_id\n' +
    'left join artist a on a.id = ea.artist_id\n' +
    'left join venue v on v.id = e.venue_id\n' +
    'where e.id = $1';
    const values = [id];
    try {
      const event = await pool.query(query, values);
      return event.rows;
    } catch (err) {
      console.log(err.message);
    }
}

module.exports = {
    getAllEvents,
    getEventById,
  }
