import axios from 'axios';
import { Redirect } from 'react-router';

export default async function Logout (){
    try {
        const url = '/api/logout';
        const response = await axios({
            method: 'delete',
            url: url,
        });
        console.log(response);
    } catch (err) {
        console.log("Failing to call login api" + err);
    }    
    
    return <Redirect push to = {{
        pathname: '/login',
        state: {data: "test"}
    }} />
}