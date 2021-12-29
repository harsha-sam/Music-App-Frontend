import {
    SET_USER, SET_INIT_AUTH,
    SET_REFRESH_AUTH,
    SET_NEW_RELEASES,
    SET_PLAYLISTS,
    SET_PLAY,
    SET_PLAYING_TRACKS,
    SET_PLAYING_TRACK_LYRICS,
    SET_FEATURED_PLAYLISTS,
    SIGN_OUT
} from "./actions";
import SpotifyWebApi from "spotify-web-api-node";

export const initialState = {
    user: null,
    accessToken: null,
    expiresIn: null,
    refreshToken: null,
    spotifyApi: new SpotifyWebApi({
        clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        redirectUri: process.env.REACT_APP_SPOTIFY_APP_REDIRECT_URI
    }),
    playingTracks: "",
    play: false,
    featuredPlaylists:[]
}
export const reducer = ((state = initialState, action) => {
    const { type, payLoad } = action;
    switch (type) {
          case SET_USER: {
            return { ...state, user: payLoad }
        }
        case SET_INIT_AUTH: {
            return {
                ...state, accessToken: payLoad.access_token,
                expiresIn: payLoad.expires_in, refreshToken: payLoad.refresh_token,
            }
        }
        case SET_REFRESH_AUTH: {
            return {
                ...state, accessToken: payLoad.access_token,
                expiresIn: payLoad.expires_in,
            }
        }
        case SET_NEW_RELEASES: {
            return { ...state, newReleases: payLoad }
        }
        case SET_PLAYLISTS: {
            return { ...state, playlists: payLoad }
        }
        case SET_PLAYING_TRACKS: {
            return { ...state, playingTracks: payLoad }
        }
        case SET_PLAYING_TRACK_LYRICS: {
            return { ...state, playingTrackLyrics: payLoad }
        }
        case SET_FEATURED_PLAYLISTS: {
            return { ...state, featuredPlaylists: payLoad }
        }
        case SET_PLAY:{
            return { ...state, play: payLoad }
        }
        case SIGN_OUT: {
            window.location.href = process.env.REACT_APP_BASE_URL
            return initialState
        }
        default: {
            return state
        }
    }
})