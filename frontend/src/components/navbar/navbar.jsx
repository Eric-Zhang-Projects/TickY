import { NotLoggedInItems, LoggedInItems } from './navbarItems';
import { useContext } from 'react';
import { UserContext } from '../../UserContext.js';
import Logout from '../../containers/user-containers/logout.jsx';

const Navbar = (props) => {

    const {user, setUser} = useContext(UserContext);

    return(
    <div>
        {(user ? LoggedInItems : NotLoggedInItems).map((item, index) => {
            return (
                <li key = {index}>
                <a href = {item.link}>{item.title}</a>
                </li>
                
            )
        })}
        {(user ? 
                <li>
                    <button onClick={()=>Logout()}>Log out</button>
                </li>
            : <li></li>
        )}
        </div>

    )
}

export default Navbar;