import { useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from "../../App";
import axios from 'axios';
import { SET_INIT_AUTH, SET_REFRESH_AUTH } from '../../store/actions';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const useAuth = (code) => {
    const { state } = useContext(StateContext);
    const { dispatch } = useContext(DispatchContext);
    useEffect(() => {
        axios
            .post(`${API_BASE_URL}/login`, {
                authorizationCode: code
            })
            .then((res) => {
                const { access_token, expires_in, refresh_token } = res.data;
                dispatch({
                    type: SET_INIT_AUTH, payLoad: {
                        access_token,
                        expires_in,
                        refresh_token
                    }
                })
                window.history.pushState({}, null, "/")
            })
            .catch(() => {
                window.location = "/"
            })
    }, [code, dispatch])

    useEffect(() => {
        if (!state.refreshToken || !state.expiresIn) return
        const interval = setInterval(() => {
            axios
                .post(`${API_BASE_URL}/refresh`, {
                    refreshToken: state.refreshToken,
                })
                .then(res => {
                    const { access_token, expires_in } = res.data;
                    dispatch({
                        type: SET_REFRESH_AUTH, payLoad: {
                            access_token,
                            expires_in,
                        }
                    })
                })
                .catch(() => {
                    window.location = "/"
                })
        }, (state.expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [state.refreshToken, state.expiresIn, dispatch])

    return state.access_token;
}
export default useAuth