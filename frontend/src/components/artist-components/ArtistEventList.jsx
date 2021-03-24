import React from "react";
import { Redirect } from 'react-router';

const ArtistEventList = (props) => {

const handleClick = (id) => {
    console.log("redirect");
    return <Redirect push to = {{
        pathname: '/',
        state: {data: "test"}
    }} />
}

    return (
        // <div>
        // <div>
        //     {props.data.name} - {props.data.date}
        // </div>
        // <div>
        //     {props.data.venue_name} - {props.data.location}
        // </div>
        // </div>
        <button className = "ArtistEventButton" onClick={() => handleClick(props.data.id)}>
        <div>
            {props.data.name} - {props.data.date}
        </div>
        <div>
            {props.data.venue_name} - {props.data.location}
        </div> 
        </button>
    )
} 

export default ArtistEventList;