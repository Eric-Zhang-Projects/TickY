import React from "react";
import ArtistEventList from './ArtistEventList';
import './artist-styles.css';

const Artist = (props) => {

    return (
        <div className = "ArtistBlockParent">
        <div className = "ArtistImg">Img</div>
        <div className = "ArtistName">{props.data.artist.name}</div>
        <div className = "EventsHeader">Events</div>
        <div className = "EventsListParent">
            <div className = "EventsList">
            {props.data.events.map((item, index)=> {
                return (
                    <li key = {index} className = "ArtistEventListItem">
                        <ArtistEventList data={item}/>
                    </li>
                )
            })}
            </div>
        </div>
        </div>
    )
}

export default Artist;