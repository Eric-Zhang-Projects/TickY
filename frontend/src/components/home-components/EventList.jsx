import Event from './Event';
import './event-styles.css';

const EventList = (props) => {
    return(
    <div className = "Parent">
        <div className = "EventList"> {props.data.map((item) => {
            return (
                <li className="ListItem">
                    <Event data={item}/>
                </li>
            )
       })}
        </div>
    </div>

    )
}

export default EventList;