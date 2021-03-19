//import Event from '../../components/home-components/Event';
import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../UserContext.js';
import axios from 'axios';
import { Redirect } from 'react-router';

const Event = () => {

    const {user, setUser} = useContext(UserContext);

    const [nav, setNav ] = useState('');

    //const [auth, setAuth] = useState(false);

    const [response, setResponse] = useState([]);

    useEffect(() => {
        console.log("current user: " + user);
        async function getAllEvents(){
            const url = '/api/events';
            let response = await axios({
                method: 'get',
                url: url,
            });
            response.data.user===undefined ? setUser('User defined in context') : setUser(null);
            console.log(user);
            setResponse(response.data);
            //setUser(response.data)
            console.log(response);
        };
        getAllEvents();
        console.log(response);
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
                setNav('/');
            }
        } catch (err) {
            console.log("Failing to call login api" + err);
            setUser("User failed to log out, logging out anyway");
        }
        
    }

//     function redir (path) {
//    return <Redirect push to = {{
//             pathname: path,
//             state: {data: "test"}
//         }} />
//     }
    if (nav === '/login'){
    return <Redirect push to = {{
            pathname: '/login',
            state: {data: "test"}
        }} />
    } else if (nav=== '/'){
        return <Redirect push to = {{
            pathname: '/',
            state: {data: "test"}
        }} />
    }

    return (
    <div>
    {user ? 
        <div>
        Event page - current user: {user}
        <div>{JSON.stringify(response)}</div>
        <button type="logout" onClick={logout}>Log Out</button>
        </div>
         :
         <div>
         Event page - No user logged in
         <div>{JSON.stringify(response)}</div>
         <button type="login" onClick={() => setNav('/')}>Log In</button>
         </div>
    }
    </div>
    )
        
}

export default Event;
