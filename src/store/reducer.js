import { SET_USER, SET_INIT_AUTH, SET_REFRESH_AUTH, SET_NEW_RELEASES, SET_PLAYLISTS, SIGN_OUT } from "./actions";
import SpotifyWebApi from "spotify-web-api-node";

export const initialState = {
    user: null,
    accessToken: null,
    expiresIn: null,
    refreshToken: null,
    spotifyApi: new SpotifyWebApi({
        clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        redirectUri: process.env.REACT_APP_SPOTIFY_APP_REDIRECT_URI
    })
}
export const reducer = ((state = initialState, action) => {
    const { type, payLoad } = action;
    switch (type) {
        case SET_USER: {
            return { ...state, user: payLoad }
        }
        case SET_INIT_AUTH: {
            // const { spotifyApi } = state;
            // spotifyApi.setAccessToken(payLoad.accessToken);
            return {
                ...state, accessToken: payLoad.access_token,
                expiresIn: payLoad.expires_in, refreshToken: payLoad.refresh_token,
            }   
        }
        case SET_REFRESH_AUTH: {
            // const { spotifyApi } = state;
            // spotifyApi.setAccessToken(payLoad.accessToken);
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
        case SIGN_OUT: {
            return { ...state, user: null, accessToken: null }
        }
        default: {
            return state
        }
    }
})