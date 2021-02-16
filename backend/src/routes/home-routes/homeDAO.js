const pool = require('../../db')

//Gets soonest 9 events with line up
async function soonestEvents() {
    const query = 
    'with e as (\n' +
        'select * from event e order by date limit 9\n' +
        ') select\n' +
        'e.id event_id, e.name event_name, e.description, e.date, e.start_time, e.end_time,\n' +
        'v.name venue_name,\n' +
        'a.name artist_name\n' +
        'from e\n' +
        'left join event_artist ea on e.id = ea.event_id\n' +
        'left join artist a on a.id = ea.artist_id\n' +
        'left join venue v on v.id = e.venue_id';
    try {
      const getData = await pool.query(query);
      return getData.rows;
    } catch (err) {
      console.log(err.message);
    }
};

module.exports = {
    soonestEvents
}