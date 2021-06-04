import { useRef, useEffect, useContext } from "react"
import { StateContext } from "../../App";
import { DispatchContext } from "../../App";
import { SET_PLAY, SET_PLAYING_TRACK_LYRICS } from "../../store/actions";
import SpotifyPlayer from "react-spotify-web-playback";
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export default function Player() {
    const isInitialMount = useRef(true);
    const { state } = useContext(StateContext);
    const { dispatch } = useContext(DispatchContext);

    useEffect(() => {
        if (isInitialMount.current && state.playingTracks) {
            isInitialMount.current = false;
         } else {
            dispatch({ type: SET_PLAYING_TRACK_LYRICS, payLoad: "Loading..."})
            axios
            .get(`${API_BASE_URL}/lyrics`, {
                params: {
                    title: state.playingTracks.title,
                    artist: state.playingTracks.artist,
                }
            })
            .then(res => {
                console.log(res.data.lyrics);
                dispatch({ type: SET_PLAYING_TRACK_LYRICS, payLoad: res.data.lyrics})
            })
            .catch(err => console.log(err))
            dispatch({ type: SET_PLAY, payLoad: true })
         }
    }, [state.playingTracks, dispatch])

    if (!state.accessToken) return null
    return (
        <footer className="player">
            <SpotifyPlayer
                token={state.accessToken}
                showSaveIcon
                callback={state => {
                    if (!state.isPlaying) dispatch({ type: SET_PLAY, payLoad: false })
                }}
                play={state.play}
                uris={state.playingTracks ? [state.playingTracks.uri] : []}
                styles={{
                    bgColor: "#222326", color: '#fff',
                    trackNameColor: '#fff', loaderColor: '#fff', sliderColor: '#1DB954',
                    activeColor: '#b71c1c', height: 70
                }}
            />
        </footer>
    )
}