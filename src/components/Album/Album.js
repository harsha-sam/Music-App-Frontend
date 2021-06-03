import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from "../../App";
import { useParams } from "react-router-dom";
import Playlists from "../Playlists/Playlists";

const Album = ({type}) => {
    const [info, setInfo] = useState({
        title: "",
        artist: "",
        image: "",
        tracks:[],
    })
    const { state } = useContext(StateContext);
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        if (type === "album"){
            state.spotifyApi.getAlbum(id)
            .then(function(data) {
                const tracks = data.body.tracks.items.map(track =>{
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        duration_ms: track.duration_ms,
                        uri: track.uri,
                    }
                })
                setInfo({tracks, title: data.body.name, artist: data.body.artists[0].name,
                    image: data.body.images[1].url})
            }, function(err) {
                console.error(err);
            });
        }
        else if (type === "playlist"){
            state.spotifyApi.getPlaylist(id)
            .then(function(data) {
                console.log('Some information about this playlist', data.body);
                const tracks = data.body.tracks.items.map(item =>{
                    const { track } = item;
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        duration_ms: track.duration_ms,
                        uri: track.uri,
                    }
                })
                setInfo({tracks, title: data.body.name, artist: data.body.owner.display_name,
                    image: data.body.images[1].url})
            }, function(err) {
                console.log('Something went wrong!', err);
            });
        }
    }, [id, state.spotifyApi, type])

    return <Playlists {...info}/>
}

export default Album
