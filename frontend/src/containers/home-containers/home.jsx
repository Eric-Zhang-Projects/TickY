//import Event from '../../components/home-components/Event';
import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../UserContext.js';
import axios from 'axios';
import { Redirect } from 'react-router';

const Home = () => {

    const {user, setUser} = useContext(UserContext);

    const [nav, setNav ] = useState('/');

    //const [auth, setAuth] = useState(false);

    const [home, setHome] = useState([]);

    useEffect(() => {
        console.log(user);
        async function getHomeEvents(){
            const url = '/api/';
            let response = await axios({
                method: 'get',
                url: url,
            });
            setHome(response.data);
            console.log(response);
        };
        getHomeEvents();
        console.log(home);
    }, [])

   // const [event, useEvent] = useState([]);


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
                setUser(null);
            }
        } catch (err) {
            console.log("Failing to call login api" + err);
            setUser("User failed to log out, logging out anyway");
        }
        
    }

    if (nav === '/login'){
    return <Redirect push to = {{
            pathname: '/login',
            state: {data: "test"}
        }} />
    }

    return (
    <div>
    {user ? 
        <div>
        Home page - current user: {user}
        <div>{JSON.stringify(home)}</div>
        <button type="logout" onClick={logout}>Log Out</button>
        </div>
         :
         <div>
         Home page - No user logged in
         <div>{JSON.stringify(home)}</div>
         <button type="login" onClick={() => setNav('/login')}>Log In</button>
         </div>
    }
    </div>
    )
        
}

export default Home;
