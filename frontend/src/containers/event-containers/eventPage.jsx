import EventAuction from '../../components/event-components/EventAuction';
import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../UserContext.js';
import axios from 'axios';
import { Redirect, useParams } from 'react-router-dom';

const EventPage = () => {

    let { id } = useParams();

    const {user, setUser} = useContext(UserContext);

    const [response, setResponse] = useState([]);

    const [redirect, setRedirect] = useState(false);

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
            setRedirect(false);
        };
        getAllEvents();
        console.log(response.data);
    }, [])

    async function placeBid(auctionId, bidPrice){
        console.log("Placing bid " + bidPrice);
        const url = '/api/auctions/' + auctionId + '/bid';
        let response = await axios({
            method: 'post',
            url: url,
            data: {
                offer: bidPrice
            }
        });
        setUser(response.data.user);
        if (!response.data.user){
            console.log("No user found, cannot place bid");
            setRedirect(true);
        }
        //setUser(response.data.user);
    }

    return (
        <div>
            {redirect ?
            (<Redirect push to = {{
                pathname: '/login',
                 state: {redirect: "/event/" + id}
            }} /> )
            :            
    <div>
        {response ?
            (<EventAuction data={response} handleBid = {placeBid}/>)
            :
            null
        }
    </div>
    }
    </div>

    )
        
}

export default EventPage;
