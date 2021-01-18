const pool = require('../../db')

const soonest = async (req, res) => {
    const query = 'select * from event order by date_time limit 10';
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