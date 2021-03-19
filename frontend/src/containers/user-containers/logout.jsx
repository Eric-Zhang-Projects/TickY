import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../UserContext.js';
import { Redirect } from 'react-router';

// const {user, setUser} = useContext(UserContext);
const Logout = () => {

    const {user, setUser} = useContext(UserContext);

    async function handleLogout (){
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
    handleLogout();

    return <Redirect push to = {{
        pathname: '/login',
        state: {data: "test"}
    }} />
}

export default Logout;