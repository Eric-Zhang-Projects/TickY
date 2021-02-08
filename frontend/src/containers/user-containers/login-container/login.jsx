import LoginForm from '../../../components/user-components/login-component/login';
//import {useState} from 'react';
import axios from 'axios';

const Login = () => {

    //const [event, useEvent] = useState([]);

    async function submitForm(props) {
        try {
            console.log(props.email);
            const data = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/login',
                data: {
                    username: props.email,
                    password: props.password
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
    
        return <div>
            <LoginForm submitForm={submitForm}/>
        </div>
        
}

export default Login;
