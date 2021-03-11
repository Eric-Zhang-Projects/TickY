import Event from '../../components/home-components/Event';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

const Home = () => {

  //  const [eventData, setEventData] = useEffect([]);
    const [event, useEvent] = useState([]);

    const [auth, setAuth] = useState(false);

    async function logout (){
        try {
            const url = '/api/logout';
            console.log(url);
            const data = await axios({
                method: 'delete',
                url: url,
            });
            console.log(data);
            if (data.data === 'logged out'){
                setAuth(true);
            }
        } catch (err) {
            console.log("Failing to call login api" + err);
        }
        
    }

    if (auth){
        return <Redirect push to = {{
            pathname: '/',
            state: {data: "false"}
        }} />
    }

    return (<div>Home page - log in status - {auth}
        <div>
        <button type="logout" onClick={logout}>LogOut</button>
        </div>
    </div>);
        
}

export default Home;
