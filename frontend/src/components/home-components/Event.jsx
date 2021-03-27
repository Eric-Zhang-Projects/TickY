import React from 'react';
import './event-styles.css';
import { Link } from 'react-router-dom';

const Event = (props) => {
    return(
    <React.Fragment>
        <div className = "EventImage">IMG</div>
        <div className = "EventInfo">
        <div>Event name: {props.data.event_name}</div>
        <div className="Lineup">Line up: {props.data.lineup.map((artist, index) => {
            return (
            <React.Fragment key = {index}>
            {artist.name ?
                <Link to = {"/artist/" + artist.id} className = "ArtistBlock">
                <a href = {'/artist/' + artist.id} className="ArtistBlock">{artist.name}</a>
                </Link>
                : 
                <a href = '/' className="ArtistBlock">Not Available</a>
            }
            </React.Fragment>
            )
        })}
        </div>
        <div>Venue: {props.data.venue} - {props.data.venue_location}</div>
        <div>Date/Time: {props.data.date}</div>
        </div>
    </React.Fragment>

    )
}

export default Event;