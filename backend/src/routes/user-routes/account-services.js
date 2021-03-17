const dao = require('./account-servicesDAO.js');
const uuid = require('uuid');

/*
Account, Update Account, Sell Ticket
*/

const sell = async (req, res) => {
    /*
    Request:
        - User ID (from session frontend)
        - Event ID (entered from frontend)
        - Ticket Data (entered from frontend (barcode))
        - Seating area
        - picture

        - auction name
        - auction description 
        - expiration date
        - ask price
        - ticket quantity
    
    1. Upload ticket to ticket table
    2. Upload ticket as auction
    3. Create relation in user_ticket_event_auction table
    */
   //console.log(req.body);
   const ticketId = uuid.v4();
   const auctionId = uuid.v4();
   let ticket = {
       id: ticketId,
       seating_area: req.body.seating_area,
       data: req.body.data,
       picture: req.body.picture
    };
    let auction = {
        id: auctionId,
        winning_bid_id: null,
        name: req.body.auction_name,
        description: req.body.auction_description,
        is_closed: false,
        expiration_date: req.body.expiration_date,
        ask_price: req.body.ask_price,
        ticket_quantity: req.body.ticket_quantity
    }
    let relation = {
        user_id: req.session.passport.user,
        ticket_id: ticketId,
        event_id: req.body.event_id,
        auction_id: auctionId
    }
   try {
       const upload = await dao.uploadTicket(ticket, auction, relation);
       if (upload === undefined){
           console.log("Successfully uploaded ticket");
           res.json("Success");
       } else {
           console.log("Failed to upload ticket");
           res.json("Error");
       }
   } catch (err){
       console.log(err);
   }
   
}

const onboard = async(req, res) => {
    console.log("Register new Seller");
    try {
        let seller = {
            id: req.session.passport.user,
            name: req.body.name,
            customer_id: req.session.passport.customer_id
        }
        const onboard = await dao.onboardSeller(seller);
        if (onboard !== 0 && onboard.name === undefined){
            console.log("Successfully onboarded new seller");
            res.json("Success");
        } else {
            console.log("Failed to onboard new seller, updated " + onboard + " rows");
            res.json("Error");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    sell,
    onboard
}