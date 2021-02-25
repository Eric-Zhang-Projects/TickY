const pool = require('../../db')

async function getAllEvents() {
    try {
        const events = await pool.query('select * from event');
        return events.rows;
      } catch (err) {
        console.log(err.message);
      }
}

async function getEventVenueDetailsById(id) {
  const query = 
  'select\n' +
  'e.id event_id, e.name event_name, e.description, e.date, e.start_time, e.end_time,\n' + 
  'v.name venue_name, v.address venue_address, v.location venue_location\n' +
  'from event e\n' +
  'left join venue v on v.id = e.venue_id\n' +
  'where e.id = $1'
  const values = [id];
  try {
    const event = await pool.query(query, values);
    return event.rows[0];
  } catch (err) {
    console.log(err.message);
  }
}

async function getEventArtistsById(id) {
  const query = 
  'select\n' +
  'a.id, a.name\n' +
  'from artist a\n' +
  'left join event_artist ea on a.id = ea.artist_id\n' +
  'where ea.event_id = $1'
  const values = [id];
  try {
    const event = await pool.query(query, values);
    return event.rows;
  } catch (err) {
    console.log(err.message);
  }
}

async function getEventAcutionsById(id) {
  const query = 
  'select\n' +
  'a.id auction_id, a.expiration_date, a.ask_price, a.ticket_quantity\n' +
  'from auction a\n' +
  'inner join user_ticket_event_auction r on a.id = r.auction_id\n' +
  'where r.event_id = $1'
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
  getEventVenueDetailsById,
  getEventArtistsById,
  getEventAcutionsById
}
