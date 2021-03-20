import { NotLoggedInItems, LoggedInItems } from './navbarItems';
import { useContext } from 'react';
import { UserContext } from '../../UserContext.js';
import Logout from '../../containers/user-containers/logout.jsx';
import './navbar-styles.css';

const Navbar = () => {

    const {user, setUser} = useContext(UserContext);

    function handleLogout() {
        setUser(null);
        Logout();
    }

    return(
    <div className="Navbar">
    <div className = "Logo">
        <a className = "Link" href = '/'>Ticky</a>
    </div>
    <div className = "SearchBarDiv">
            <input type="text" className = "SearchBar" name="search" placeholder="Search for an Event or Artist"/>
    </div>
    <div className = "NavItemsDiv">
        <div className = "NavItems">
        {(user ? LoggedInItems : NotLoggedInItems).map((item, index) => {
            return (
                <li className = "Item" key = {index}>
                <a className = "Link" href = {item.link}>{item.title}</a>
                </li>
                
            )
        })}
        {(user ? 
                <li className = "Item">
                    <button onClick={()=>handleLogout()}>Log out</button>
                </li>
            : <></>
        )}
        </div>
    </div>
    </div>

    )
}

export default Navbar;