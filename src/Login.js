import React from 'react';
import { Container } from 'react-bootstrap';
import './Login.css'
import audioPlayerIllustration from "./assets/audio-player-illustration.svg"

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=449154ee43934fedaf41f90755746f08&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

function Login() {
    return (
        <Container className="d-flex flex-row justify-content-center
         align-items-center login-container">
            <img src={audioPlayerIllustration} alt="logo" className="illustration"/>
            <a href={AUTH_URL} className="btn btn-success btn-lg login-btn">
            Login with Spotify</a>
        </Container>
    )
}

export default Login
