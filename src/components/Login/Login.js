import React from 'react';
import './Login.css'
import audioPlayerIllustration from "../../assets/audio-player-illustration.svg"

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_APP_REDIRECT_URI;
const SCOPES = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-recently-played"
]
const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code\
&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join("%20")}`

function Login() {
    return (
        <div className="container-fluid flex-row">
            <img src={audioPlayerIllustration} alt="Audio Player illustration" />
            <a href={AUTH_URL} className="btn btn-success btn-lg">
                Login with Spotify</a>
        </div>
    )
}

export default Login
