import EventAuction from '../../components/event-components/EventAuction';
import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../UserContext.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventPage = () => {

    let { id } = useParams();

    const {user, setUser} = useContext(UserContext);

    const [response, setResponse] = useState([]);

    useEffect(() => {
        console.log("event id: " + id);
        async function getAllEvents(){
            const url = '/api/events/' + id;
            let response = await axios({
                method: 'get',
                url: url,
            });
            setResponse(response.data.response);
            setUser(response.data.user);
        };
        getAllEvents();
        console.log(response.data);
    }, [])

    return (
    <div>
        <div>{JSON.stringify(response)}</div>
        {response ?
            (<EventAuction data={response}/>)
            :
            null
        }
    </div>
    )
        
}

export default EventPage;
