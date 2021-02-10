import Event from '../../components/home-components/Event';
import {useState} from 'react';

const Home = () => {

    const [event, useEvent] = useState([]);

    
        return <div>
            <Event/>
        </div>
        
}

export default Home;
