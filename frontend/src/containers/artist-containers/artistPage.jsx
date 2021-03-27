import ArtistBlock from '../../components/artist-components/ArtistBlock';
import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../UserContext.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ArtistPage = () => {

    let { id } = useParams();

    const {user, setUser} = useContext(UserContext);

    const [artist, setArtist] = useState(null);

    useEffect(() => {
        console.log("current user: " + user);
        console.log("Artist id: " + id);
        async function getArtist(){
            const url = '/api/artists/' + id;
            let response = await axios({
                method: 'get',
                url: url,
            });
            setArtist(response.data.response);
            setUser(response.data.user);
        };
        getArtist();
        console.log(artist);
    }, [])

    return (
        <div>
            <div>
        
            {artist ? 
            <ArtistBlock data = {artist}/>
                : 
                null
            }
            </div>
        </div>
    )
}

export default ArtistPage;