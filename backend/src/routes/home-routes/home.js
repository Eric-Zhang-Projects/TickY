const pool = require('../../db')

/*
Home Page
1. Displays closest events to date.
2. Can click on displayed events to be taken to bidding page
3. can search for other events by name or artist
*/
const soonest = async (req, res) => {
    const query = 'select * from event order by date limit 9';
    try {
      const getData = await pool.query(query);
      res.json(getData.rows);
    } catch (err) {
      console.log(err.message);
    }
  };

module.exports = {
    soonest
}