const pool = require('../../db');
const { edm_train_api_key } = require('../../secrets.js');
const axios = require('axios');
const getDate = require('../../helpers/getDate');

//Run EDM Train events API to onboard new events and/or artist + venue data if applicable
const onboardNewEvents = async (req, res) => {
    //Get all events from EDM Train API that end on x date. 
    console.log(getDate.todaysDate());
    console.log(getDate.daysFromNow(20));
    console.log(getDate.monthsFromNow(13));
    try {
        const apiCall = await axios({
            method: "GET",
            url: `https://edmtrain.com/api/events?`,
            headers: {
                
            },
            params: {
                client: edm_train_api_key,
                endDate: getDate.monthsFromNow(1)
            }
        })
        res.json(apiCall.data);
    } catch (err){
        console.log(err.message);
    }
    //insert data to db
  };

module.exports = {
    onboardNewEvents
}