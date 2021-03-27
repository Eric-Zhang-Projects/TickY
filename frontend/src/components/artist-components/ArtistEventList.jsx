import React from "react";

const ArtistEventList = (props) => {
    return (
        <div className = "ArtistEventButton">
        <div>
            {props.data.name} - {props.data.date}
        </div>
        <div>
            {props.data.venue_name} - {props.data.location}
        </div> 
        </div>
    )
} 

export default ArtistEventList;