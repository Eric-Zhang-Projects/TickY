import Event from './Event';
import './event-styles.css';
import { Link } from 'react-router-dom';

const EventList = (props) => {
    return(
    <div className = "Parent">
        <div className = "EventList"> {props.data.map((item) => {
            return (
                <Link to = {"/event/" + item.event_id} className = "EventLink" key = {item.event_id}>
                <li className="ListItem" key = {item.event_id}>
                    <Event data={item}/>
                </li>
                </Link>
            )
       })}
        </div>
    </div>

    )
}

export default EventList;