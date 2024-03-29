import React from "react";
import AuctionList from "./AuctionList";
import { Link } from 'react-router-dom';
import './event-auction-styles.css';
import BidPopUp from "../popup/BidPopUp";

const EventAuction = (props) => {

    return (
        <div className = "EventAuctionParent">
        <div className = "EventName">{props.data.event_name}</div>
        <div className = "EventDetails">
            <div>{props.data.description}</div>
            <div>
                {props.data.start_time && props.data.end_time ? 
                (<div>{props.data.start_time}-{props.data.end_time}, </div>)
                    :
                    null
                }
            {props.data.date} | {props.data.venue_name}, {props.data.venue_location}</div>
        </div>
        <div>Event Line Up maybe make into component from Event.jsx from home</div>
        <div className = "AuctionsHeader">Auctions</div>
        {props.data.auctions ? 
        (
                <div className = "AuctionsListParent">
                <div className = "AuctionsList">
                {props.data.auctions.map((item, index) => {
                    return (
                    <React.Fragment key = {index}>
        {/* <AuctionList data={item} handleBid={props.handleBid} key = {index}/> */}
        <BidPopUp data={item} handleBid={props.handleBid} key={index}/>
        </React.Fragment>
                    )})}
        </div></div>
        )
        :
        <div>No Auctions</div>
        }
        {/* <div className = "EventsListParent">
            <div className = "EventsList">
            {props.data.events.map((item, index)=> {
                return (
                    <li key = {index} className = "ArtistEventListItem">
                        <Link to = {"/event/" + item.id} className = "ArtistEventLink">
                        <ArtistEventList data={item}/>
                        </Link>
                    </li>
                )
            })}
            </div>
        </div> */}
        </div>
    )
}

export default EventAuction;