import React, { useState, useEffect, useContext } from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { StateContext } from "../../App.js";
import { DispatchContext } from "../../App.js";
import { SET_PLAYING_TRACKS } from "../../store/actions";

function Search({ chooseTrack, playingTrackLyrics }) {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { state } = useContext(StateContext);
    const { dispatch } = useContext(DispatchContext);
    const { spotifyApi } = state;
    useEffect(() => {
        if (!search) {
            setSearchResults([])
            return
        }
        spotifyApi.searchTracks(search)
            .then((res) =>
                setSearchResults(res.body.tracks.items.map(track => {
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
                })))
    }, [search, spotifyApi])

    return (
        <section>
            <div className="form-group mt-4">
                <Input
                    className="form-control"
                    disableUnderline="true"
                    placeholder={"Songs, Artists or Albums"}
                    type={'text'}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                />
            </div>
            {searchResults.length > 0 && <div className="searchResults">
                {searchResults.map((track) => {
                    return <div key={track.uri} className="track" onClick={() => {
                        dispatch({type: SET_PLAYING_TRACKS, payLoad: track})
                        setSearch("")
                    }}>
                        <img src={track.albumUrl} alt={track.title} />
                        <div>
                            <h5 className="mb-0">{track.title}</h5>
                            <small>{track.artist}</small>
                        </div>
                    </div>
                })}
            </div>}
            {searchResults.length === 0 && playingTrackLyrics &&
            <div className="lyrics">
                <h3>Lyrics</h3>
                <div className="mt-2">
                    {playingTrackLyrics.split("\n").map((line, index) => {
                        return <p key={index}>{line}</p>
                    })}
                </div>
            </div>}
        </section>
    )
}

export default Search
