import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from "../../App";
import { useParams } from "react-router-dom";

const Album = () => {
    const [tracks, setTracks] = useState([]);
    const { id } = useParams();
    const { state } = useContext(StateContext);
    
    useEffect(() => {
        state.spotifyApi.getAlbumTracks(id)
            .then((data) => {
                console.log(data.body)
            }, (err) => console.log(err))
    }, [id, state.spotifyApi])

    return (
        <div>
            <h2>Album {id}</h2>
        </div>
    )
}

export default Album
