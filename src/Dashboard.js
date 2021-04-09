import React, { useState, useEffect } from 'react'
import useAuth from "./useAuth"
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    client_id: "449154ee43934fedaf41f90755746f08"
})

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code)
    const [searchField, setSearchField] = useState()
    const [searchResults, setSearchResults] = useState([])


    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        console.log(searchField)
        if (!searchField) {
            setSearchResults([])
            return
        }
        spotifyApi.searchTracks(searchField)
            .then((data) => {
                console.log(data)
                setSearchResults(
                    data.body.tracks.items.map(track => {
                        const smallestAlbumImage = track.album.images.reduce(
                            (smallest, image) => {
                                if (image.height < smallest.height) return image
                                return smallest
                            },
                            track.album.images[0]
                        )

                        return {
                            artist: track.artists[0].name,
                            title: track.name,
                            uri: track.uri,
                            albumUrl: smallestAlbumImage.url,
                        }
                    })
                )
            })
            .catch((err) => {
                console.error(err)
            })
    }, [accessToken, searchField])

    return <React.Fragment>
        <input className="form-control" type="text" val={searchField}
            onChange={(e) => {
                setSearchField(e.target.value)
            }}
            placeholder="Search for Song, Artist, Album"
        />
    </React.Fragment>
}
export default Dashboard