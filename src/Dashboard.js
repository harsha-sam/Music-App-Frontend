import React, { useEffect, useReducer, useState } from 'react'
import useAuth from "./useAuth"
import SpotifyWebApi from "spotify-web-api-node"
import Sidebar from "./Sidebar.js"
import { Avatar } from "@material-ui/core/";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Home from "./Home";
import Search from "./Search";
import Player from "./Player";

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

const spotifyApi = new SpotifyWebApi({
    client_id: "449154ee43934fedaf41f90755746f08"
})

const initialState = {
    user: null,
    accessToken: null
}

const reducer = ((state, action) => {
    if (action.type === "SET_USER") {
        return {
            ...state,
            user: action.payLoad
        }
    }
    else if (action.type === "SET_TOKEN") {
        return {
            ...state,
            accessToken: action.payLoad
        }
    }
    else if (action.type === "SET_NEW_RELEASES") {
        return {
            ...state,
            newReleases: action.payLoad
        }
    }
    else if (action.type === "SET_PLAYLISTS") {
        return {
            ...state,
            playlists: action.payLoad
        }
    }
    else if (action.type === "SIGN_OUT") {
        return {
            ...state,
            user: null,
            accessToken: null
        }
    }

    return state
})

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code)
    const [state, dispatch] = useReducer(reducer, initialState)
    const classes = useStyles();
    const [curr, setCurr] = useState("Home");
    const [playingTrack, setPlayingTrack] = useState(null);

    const handleCurr = ((value) => setCurr(value))

    const chooseTrack = (track) => {
        setPlayingTrack(track)
    }

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        dispatch({ type: "SET_TOKEN", payLoad: accessToken })
        spotifyApi.getMe()
            .then((data) => dispatch({ type: "SET_USER", payLoad: data.body }), (err) => console.log(err))
        spotifyApi.getNewReleases({ limit: 10, offset: 0, country: "IN" })
            .then((data) => dispatch({ type: "SET_NEW_RELEASES", payLoad: data.body }), (err) => console.log(err))
        spotifyApi.getUserPlaylists()
        .then((data) => dispatch({ type: "SET_PLAYLISTS", payLoad: data.body }), (err) => console.log(err))
    }, [accessToken])

    console.log(state)
    return <div className="main-flex">
        <Sidebar playlists={state.playlists}
        handleCurr={handleCurr}
        />
        {
            curr === "Home" ?
            <div className="home">
                <Chip
                    icon = {<Avatar src={state.user?.images?.[0].url} className={classes.small}/>}
                    label = {state.user?.display_name}
                    onDelete={() => dispatch({type: "SIGN_OUT"})}
                    className="avatar"
                />
                <Home newReleases={state.newReleases}/>
            </div>
            :
            (curr === "Search" ?
                <div className="search">
                <Chip
                    icon = {<Avatar src={state.user?.images?.[0].url} className={classes.small}/>}
                    label = {state.user?.display_name}
                    onDelete={() => dispatch({type: "SIGN_OUT"})}
                    className="avatar"
                />
                <Search spotifyApi={spotifyApi} chooseTrack={chooseTrack}/>
            </div> 
            :
            null)
        }
        <div className="player">
            <Player accessToken={accessToken} trackUri={playingTrack} />
        </div>
    </div>
}
export default Dashboard