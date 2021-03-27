import EventList from '../../components/home-components/EventList';
import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../UserContext.js';
import axios from 'axios';
// import { Redirect } from 'react-router';

const HomePage = () => {

    const {user, setUser} = useContext(UserContext);

    // const [nav, setNav ] = useState('/');

    //const [auth, setAuth] = useState(false);

    const [home, setHome] = useState([]);

    useEffect(() => {
        console.log("current user: " + user);
        async function getHomeEvents(){
            const url = '/api/';
            let response = await axios({
                method: 'get',
                url: url,
            });
            setHome(response.data.response);
            setUser(response.data.user);
        };
        getHomeEvents();
        console.log(home);
    }, [])

   // const [event, useEvent] = useState([]);


    // async function logout (){
    //     try {
    //         const url = '/api/logout';
    //         console.log(url);
    //         const response = await axios({
    //             method: 'delete',
    //             url: url,
    //         });
    //         console.log(response);
    //         if (response.data === 'logged out'){
    //             setUser(null);
    //         }
    //     } catch (err) {
    //         console.log("Failing to call login api" + err);
    //         setUser("User failed to log out, logging out anyway");
    //     }
        
    // }


    // if (nav === '/login'){
    // return <Redirect push to = {{
    //         pathname: '/login',
    //         state: {data: "test"}
    //     }} />
    // } else if (nav === '/event'){
    //     return <Redirect push to = {{
    //         pathname: '/event',
    //         state: {data: "test"}
    //     }} />
    // }

    return (
    <div>
        <div>
        Home page - current user: {user}
        </div>
        <EventList data={home}/>
    {/* {user ? 
        <div>
        Home page - current user: {user}
        <div>{JSON.stringify(home)}</div>
        <button type="event" onClick={() => setNav('/event')}>View all events</button>
        <button type="logout" onClick={logout}>Log Out</button>
        </div>
         :
         <div>
         Home page - No user logged in
         <div>{JSON.stringify(home)}</div>
         <button type="login" onClick={() => setNav('/login')}>Log In</button>
         </div>
    } */}
    </div>
    )
        
}

export default HomePage;
