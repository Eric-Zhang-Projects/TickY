const pool = require('../../db');
const { edm_train_api_key } = require('../../secrets.js');
const axios = require('axios');
const getDate = require('../../helpers/getDate');

const clean = async (req, res) => {

    console.log(getDate.todaysDate());
    try {
        var deleteEventQuery = 'DELETE FROM event where date < $1';
        var cleanDb = await pool.query(deleteEventQuery, [getDate.todaysDate()]);
        res.json(cleanDb.rows);
    } catch (err){
        console.log(err);
    }
}

module.exports = {
    clean
}