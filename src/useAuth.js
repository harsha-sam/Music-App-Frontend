import { useState, useEffect } from 'react'
import axios from 'axios';

const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        axios
            .post("https://web-musix-api.azurewebsites.net/login", {
                authorizationCode: code
            })
            .then((res) => {
                const { access_token, expires_in, refresh_token } = res.data;
                setAccessToken(access_token)
                setExpiresIn(expires_in)
                setRefreshToken(refresh_token)
                // window.history.pushState({}, null, "/")
            })
            .catch(() => {
                window.location = "/"
            })
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios
                .post("https://web-musix-api.azurewebsites.net/refresh", {
                    refreshToken,
                })
                .then(res => {
                    setAccessToken(res.data.access_token)
                    setExpiresIn(res.data.expires_in)
                })
                .catch(() => {
                    window.location = "/"
                })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken
}
export default useAuth