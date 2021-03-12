import Event from '../../components/home-components/Event';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

const Home = () => {

    const [home, setHome] = useState([]);

    useEffect(() => {
        async function getHomeEvents(){
            const url = '/api/';
            let response = await axios({
                method: 'get',
                url: url,
            });
            setHome(response.data);
            console.log(response);
        }
        getHomeEvents();
        console.log(home);
    }, [])

    const [event, useEvent] = useState([]);

    const [auth, setAuth] = useState(false);

    async function logout (){
        try {
            const url = '/api/logout';
            console.log(url);
            const response = await axios({
                method: 'delete',
                url: url,
            });
            console.log(response);
            if (response.data === 'logged out'){
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
            <div></div>
        <button type="logout" onClick={logout}>LogOut</button>
        </div>
    </div>);
        
}

export default Home;
