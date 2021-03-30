import React from "react";
import { Redirect } from 'react-router';
import './event-auction-styles.css';


const EventAuction = (props) => {

    return (
        <div className = "AuctionsListParent">
        <div className = "AuctionsList">
        {props.data.map((item, index) => {
            return (
            <button className = "AuctionButton" key={index}>
            <div className = "QuantityDate">
                <div className ="Quantity">Tickets: {item.ticket_quantity}</div>
                <div className = "Date">Expiration Date: {item.expiration_date}</div>
            </div>
            <div>
                <div>Sold By: {item.seller_name} | Seller Rating: {item.seller_rating}</div>
            </div>
            <div>
                <div className = "AskPriceParent">
                    <div className = "AskPrice">Starting At: {item.ask_price}</div>
                </div>
            </div>
            </button>
            )
        })}
        </div>
        </div>
    )
} 

export default EventAuction;