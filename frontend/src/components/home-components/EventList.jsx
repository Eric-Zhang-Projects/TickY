import Event from './Event';
import './event-styles.css';

const EventList = (props) => {
    return(
    <div className = "Parent">
        <div className = "EventList"> {props.data.map((item) => {
            return (
                <li className="ListItem" key = {item.event_id}>
                    <Event data={item}/>
                </li>
            )
       })}
        </div>
    </div>

    )
}

export default EventList;