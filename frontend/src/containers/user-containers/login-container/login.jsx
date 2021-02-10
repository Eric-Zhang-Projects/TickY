import LoginForm from '../../../components/user-components/login-component/loginForm';
//import {useState} from 'react';
import axios from 'axios';
import { API_URL } from "../../../constants.json";

const Login = () => {

    //const [event, useEvent] = useState([]);

    async function submitForm(props) {
        try {
            const url = `${API_URL}/login`;
            console.log(url);
            const data = await axios({
                method: 'post',
                url: url,
                data: {
                    email: props.email,
                    password: props.password
                }
            });
            console.log(data);
        } catch (err) {
            console.log("Failing to call login api" + err);
        }
    }
    
    return <div>
        <LoginForm submitForm={submitForm}/>
    </div>
        
}

export default Login;
