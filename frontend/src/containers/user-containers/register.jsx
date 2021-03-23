import RegisterForm from '../../components/user-components/register-component/registerForm';
//import {useState} from 'react';
import axios from 'axios';

const Register = () => {

    //const [event, useEvent] = useState([]);

    async function submitForm(props) {
        try {
            const url = 'api/register';
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
            console.log("Failing to call register api" + err);
        }
    }
    
    return <div>
        <RegisterForm submitForm={submitForm}/>
    </div>
        
}

export default Register;
