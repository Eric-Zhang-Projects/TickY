import React from "react";
import { Redirect } from 'react-router';

const EventAuction = (props) => {

    return (
        <div>
        {props.data.map((item, index) => {
            return (
            <React.Fragment key={index}>
            <div>
                <div>Tickets: {item.ticket_quantity}</div>
                <div>Expiration Date: {item.expiration_date}</div>
            </div>
            <div>
                <div>Current Ask Price: {item.ask_price}</div>
            </div>
            <div></div>
            </React.Fragment>
            )
        })}
        </div>
    )
} 

export default EventAuction;