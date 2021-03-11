import LoginForm from '../../../components/user-components/login-component/loginForm';
import {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

const Login = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    async function submitForm(props) {
        try {
            const url = '/api/login';
            const data = await axios({
                method: 'post',
                url: url,
                data: {
                    email: props.email,
                    password: props.password
                }
            });
            if (data.data !== 'No user exists'){
                setLoggedIn(true);
            }
        } catch (err) {
            console.log("Failing to call login api" + err);
        }
    }

    if (loggedIn){
        return <Redirect push to = {{
            pathname: '/',
            state: {data: "test"}
        }} />
    }
    
    return <div>
        <LoginForm submitForm={submitForm}/>
    </div>
        
}

export default Login;
