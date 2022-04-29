import React, { useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from "../../App.js";
import { SET_USER, SET_NEW_RELEASES, SET_PLAYLISTS, SIGN_OUT, SET_FEATURED_PLAYLISTS } from "../../store/actions";
import useAuth from "./useAuth"
import Sidebar from "../Sidebar/Sidebar.js"
import { Avatar } from "@material-ui/core/";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Player from '../Player/Player';

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

const Dashboard = ({ code, childComponent}) => {
    useAuth(code);
    const classes = useStyles();
    const { state } = useContext(StateContext);
    const { dispatch } = useContext(DispatchContext);

    useEffect(() => {
        if (!state.accessToken) return
        state.spotifyApi.setAccessToken(state.accessToken);
        state.spotifyApi.getMe()
            .then((data) => dispatch({ type: SET_USER, payLoad: data.body }), (err) => console.log(err))
        state.spotifyApi.getNewReleases({ limit: 8, offset: 0, country: "IN" })
            .then((data) => dispatch({ type: SET_NEW_RELEASES, payLoad: data.body }), (err) => console.log(err))
        state.spotifyApi.getUserPlaylists()
            .then((data) => dispatch({ type: SET_PLAYLISTS, payLoad: data.body }), (err) => console.log(err))
        state.spotifyApi.getFeaturedPlaylists({ limit : 3, offset: 1})
        .then(function(data) {
            dispatch({ type: SET_FEATURED_PLAYLISTS, payLoad: data.body.playlists.items})
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [state.accessToken, state.spotifyApi, dispatch])

    return <div className="main-flex">
        <Sidebar playlists={state.playlists} />
         <div className="search">
            <Chip
                icon={<Avatar src={state.user?.images?.[0]?.url} className={classes.small} />}
                label={state.user?.display_name}
                onDelete={() => dispatch({ type: SIGN_OUT })}
                className="avatar"
            />
            { childComponent }
        </div>
        <Player />
    </div>
}
export default Dashboard