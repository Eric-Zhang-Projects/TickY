const pool = require('../../db')

const all = async (req, res) => {
  try {
    const getData = await pool.query('select * from event');
    res.json(getData.rows);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = all;