import React from "react";
import { Redirect } from 'react-router';
import './event-auction-styles.css';
import BidPopUp from '../popup/BidPopUp';


const EventAuction = (props) => {

    return (
        // <div className = "AuctionsListParent">
        // <div className = "AuctionsList">
        // {props.data.map((item, index) => {
        //     return (
             <React.Fragment>
              {/* <button className = "AuctionButton">  */}
             <div className = "QuantityDate">
                <div className ="Quantity">Tickets: {props.data.ticket_quantity}</div>
                <div className = "Date">Expiration Date: {props.data.expiration_date}</div>
            </div>
            <div>
                <div>Sold By: {props.data.seller_name} | Seller Rating: {props.data.seller_rating}</div>
            </div>
            <div>
                <div className = "AskPriceParent">
                    <div className = "AskPrice">Starting At: {props.data.ask_price}</div>
                </div>
            </div>
             {/* </button> */}
             </React.Fragment>
        //     )
        // })}
        // </div>
        // </div>
    )
} 

export default EventAuction;