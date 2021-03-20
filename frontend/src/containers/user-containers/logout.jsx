import axios from 'axios';

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
}