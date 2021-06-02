import React, { useEffect, useState, useContext } from 'react';
import { StateContext, DispatchContext } from "../../App.js";
import { SET_USER, SET_NEW_RELEASES, SET_PLAYLISTS, SIGN_OUT } from "../../store/actions";
import useAuth from "./useAuth"
import Sidebar from "../Sidebar/Sidebar.js"
import { Avatar } from "@material-ui/core/";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Home from "../Home/Home";
import Search from "../Search/Search";
import Player from "../Player/Player";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const Dashboard = ({ code }) => {
    useAuth(code);
    const classes = useStyles();
    const [curr, setCurr] = useState("Home");
    const [playingTrack, setPlayingTrack] = useState(null);
    const [playingTrackLyrics, setPlayingTrackLyrics] = useState("")
    const { state } = useContext(StateContext);
    const { dispatch } = useContext(DispatchContext);
    const handleCurr = ((value) => setCurr(value))

    const chooseTrack = (track) => {
        setPlayingTrack(track)
        setPlayingTrackLyrics("")
    }

    useEffect(() => {
        if (!playingTrack) return
        axios
            .get(`${API_BASE_URL}/lyrics`, {
                params: {
                    title: playingTrack.title,
                    artist: playingTrack.artist,
                }
            })
            .then(res => {
                setPlayingTrackLyrics(res.data.lyrics)
            })
    }, [playingTrack])

    useEffect(() => {
        if (!state.accessToken) return
        state.spotifyApi.setAccessToken(state.accessToken);
        state.spotifyApi.getMe()
            .then((data) => dispatch({ type: SET_USER, payLoad: data.body }), (err) => console.log(err))
        state.spotifyApi.getNewReleases({ limit: 10, offset: 0, country: "IN" })
            .then((data) => dispatch({ type: SET_NEW_RELEASES, payLoad: data.body }), (err) => console.log(err))
        state.spotifyApi.getUserPlaylists()
            .then((data) => dispatch({ type: SET_PLAYLISTS, payLoad: data.body }), (err) => console.log(err))
    }, [state.accessToken, state.spotifyApi, dispatch])

    console.log(state)
    return <div className="main-flex">
        <Sidebar playlists={state.playlists}
            handleCurr={handleCurr}
            curr={curr}
        />
        {
            curr === "Home" ?
                <div className="home">
                    <Chip
                        icon={<Avatar src={state.user?.images?.[0].url} className={classes.small} />}
                        label={state.user?.display_name}
                        onDelete={() => dispatch({ type: SIGN_OUT })}
                        className="avatar"
                    />
                    <Home/>
                </div>
                :
                (curr === "Search" ?
                    <div className="search">
                        <Chip
                            icon={<Avatar src={state.user?.images?.[0].url} className={classes.small} />}
                            label={state.user?.display_name}
                            onDelete={() => dispatch({ type: SIGN_OUT })}
                            className="avatar"
                        />
                        <Search chooseTrack={chooseTrack} playingTrackLyrics={playingTrackLyrics} />
                    </div>
                    :
                    null)
        }
        <div className="player">
            <Player accessToken={state.accessToken} trackUri={playingTrack?.uri} />
        </div>
    </div>
}
export default Dashboard