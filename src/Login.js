import React from 'react';
import './Login.css'
import audioPlayerIllustration from "./assets/audio-player-illustration.svg"

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=449154ee43934fedaf41f90755746f08&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

function Login() {
    return (
        <div className="container-fluid flex-row">
            <img src={audioPlayerIllustration} alt="Audio Player illustration"/>
            <a href={AUTH_URL} className="btn btn-success btn-lg">
                Login with Spotify</a>
        </div>
    )
}

export default Login
