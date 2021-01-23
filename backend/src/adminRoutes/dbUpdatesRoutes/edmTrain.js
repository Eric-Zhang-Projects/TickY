const pool = require('../../db');
const { edm_train_api_key } = require('../../secrets.js');
const axios = require('axios');
const getDate = require('../../helpers/getDate');

//Run EDM Train events API to onboard new events and/or artist + venue data if applicable
const onboardNewEvents = async (req, res) => {
    //Get all events from EDM Train API that end on x date. 
    try {
        const apiCall = await axios({
            method: "GET",
            url: `https://edmtrain.com/api/events?`,
            headers: {
                
            },
            params: {
                client: edm_train_api_key,
                endDate: getDate.daysFromNow(1)
            }
        })
       //Check for artist or venue, event will be periodically updated every x months where all table data is deleted and events for next x months are uploaded
       let artistMap = new Map();
       let venueMap = new Map();
       let eventMap = new Map();
       let eventArtistMap = new Map();
        apiCall.data.data.forEach( obj => {
            //artists
            obj.artistList.forEach( artist => {
                artistMap.set(artist.id, artist.name);
            });
            //venues
            if (obj.venue.address !== null) {
                var venue = {id: obj.venue.id, name: obj.venue.name, address: obj.venue.address, location: obj.venue.location, state: obj.venue.state};
                venueMap.set(obj.venue.id, venue);
            } else {
                var venue = {id: obj.venue.id, name: obj.venue.name, address: 'None', location: 'None', state: 'None'};
                venueMap.set(obj.venue.id, venue);
            }
            //update event
            if (obj.name === null){
                var event = {id: obj.id, name: obj.artistList[0].name, venueId: obj.venue.id, description: null, date: obj.date, startTime: obj.startTime, endTime: obj.endTime}
            } else {
                var event = {id: obj.id, name: obj.name, venueId: obj.venue.id, description: null, date: obj.date, startTime: obj.startTime, endTime: obj.endTime}
            }
            eventMap.set(obj.id, event);
            //update event_artist
            obj.artistList.forEach( artist => {
                var eventArtist = {eventId: obj.id, artistId: artist.id};
                eventArtistMap.set(obj.id + artist.id, eventArtist);
            });
            

        })

        //artist
        try {
            var currentQuery = "SELECT id from artist where id in (SELECT * FROM UNNEST ($1::integer[]))";
            var insertQuery = "INSERT INTO artist (id, name) SELECT * FROM UNNEST ($1::integer[], $2::text[])";
            var currentValues = await pool.query(currentQuery, [[...artistMap.keys()]]);
            currentValues.rows.forEach(item =>{
                artistMap.delete(item.id);
            })
            await pool.query(insertQuery, [[...artistMap.keys()], [...artistMap.values()]]);
        } catch (err) {
          console.log(err.message);
        }

        //venue
        try {
            var currentQuery = "SELECT id from venue where id in (SELECT * FROM UNNEST ($1::integer[]))";
            var insertQuery = "INSERT INTO venue (id, name, address, location, state) SELECT * FROM UNNEST ($1::integer[], $2::text[], $3::text[], $4::text[], $5::text[])";
            var currentVenues = await pool.query(currentQuery, [[...venueMap.keys()]]);
            currentVenues.rows.forEach(item =>{
                venueMap.delete(item.id);
            })
            let id = [];
            let name = [];
            let address = [];
            let location = [];
            let state = [];
            for(let venue of venueMap.values()){
                id.push(venue.id);
                name.push(venue.name);
                address.push(venue.address);
                location.push(venue.location);
                state.push(venue.state);
            }
            await pool.query(insertQuery, [[...id], [...name], [...address], [...location], [...state]]);
        } catch (err) {
          console.log(err.message);
        }

        //event
        try {
            var currentQuery = "SELECT id from event where id in (SELECT * FROM UNNEST ($1::integer[]))";
            var insertQuery = "INSERT INTO event (id, name, venue_id, description, date, start_time, end_time) SELECT * FROM UNNEST ($1::integer[], $2::text[], $3::integer[], $4::text[], $5::text[], $6::timestamp with time zone[], $7::timestamp with time zone[])";
            var currentEvents = await pool.query(currentQuery, [[...eventMap.keys()]]);
            currentEvents.rows.forEach(item =>{
                eventMap.delete(item.id);
            })
            //console.log(eventMap);
            let id = [];
            let name = [];
            let venueId = [];
            let description = [];
            let date = [];
            let startTime = [];
            let endTime = [];
            for(let event of eventMap.values()){
                id.push(event.id);
                name.push(event.name);
                venueId.push(event.venueId);
                description.push(event.description);
                date.push(event.date);
                startTime.push(event.startTime);
                endTime.push(event.endTime);
            }
            await pool.query(insertQuery, [[...id], [...name], [...venueId], [...description], [...date], [...startTime], [...endTime]]);
        } catch (err) {
          console.log(err.message);
        }

        //event_artist
        try {
            var currentQuery = "SELECT id from event_artist where id in (SELECT * FROM UNNEST ($1::integer[]))";
            var insertQuery = "INSERT INTO event_artist (id, event_id, artist_id) SELECT * FROM UNNEST ($1::integer[], $2::integer[], $3::integer[])";
            var currentRelations = await pool.query(currentQuery, [[...eventArtistMap.keys()]]);
            currentRelations.rows.forEach(item =>{
                eventArtistMap.delete(item.id);
            })
            let id = [];
            let eventId = [];
            let artistId = [];
            for(let relation of eventArtistMap.values()){
                id.push(relation.eventId + relation.artistId);
                eventId.push(relation.eventId);
                artistId.push(relation.artistId);
                
            }
            await pool.query(insertQuery, [[...id], [...eventId], [...artistId]]);
        } catch (err) {
          console.log(err.message);
        }

        res.json(apiCall.data);

    } catch (err){
        console.log(err.message);
    }
    //insert data to db
  };

module.exports = {
    onboardNewEvents
}