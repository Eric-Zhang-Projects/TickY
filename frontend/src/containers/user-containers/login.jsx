import LoginForm from '../../components/user-components/loginForm';
import { useContext} from 'react';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import { Redirect } from 'react-router';

const Login = (props) => {

    const {user, setUser} = useContext(UserContext);

   // const [loggedIn, setLoggedIn] = useState(false);

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
                setUser("user is stored in context");
            }
        } catch (err) {
            console.log("Failing to call login api" + err);
        }
    }

    if (user){
        console.log("redirect: " + props.location.state.redirect);
        return <Redirect to = {{
            pathname: props.location.state.redirect ? props.location.state.redirect : '/',
            state: {data: "test"}
        }} />
    }
    
    return <div>
        <LoginForm submitForm={submitForm}/>
    </div>
        
}

export default Login;
