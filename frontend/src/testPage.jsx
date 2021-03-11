import axios from 'axios';
import {useState} from 'react';
import { Redirect } from 'react-router';

const TestPage = () => {

    const [loggedOut, setLoggedOut] = useState(false);

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
                setLoggedOut(true);
            }
        } catch (err) {
            console.log("Failing to call login api" + err);
        }
        
    }

    if (loggedOut){
        return <Redirect push to = {{
            pathname: '/',
            state: {data: "test"}
        }} />
    }

    return (<div>AYEEE
        <div>
        <button type="logout" onClick={logout}>LogOut</button>
        </div>
    </div>);
}

export default TestPage;