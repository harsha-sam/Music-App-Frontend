import React, { useState, useEffect } from 'react'

function Search({ spotifyApi, chooseTrack, playingTrackLyrics }) {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

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
                <input type="text"
                    placeholder="Search for Song, Artist, Album" className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {searchResults.length > 0 && <div className="searchResults">
                {searchResults.map((track) => {
                    return <div key={track.uri} className="track" onClick={() => {
                        chooseTrack(track)
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
                {playingTrackLyrics !== "No lyrics found !" && 
                <small>Note: This lyrics may not be correct</small>}
                <br></br>
                {playingTrackLyrics}
            </div>}
        </section>
    )
}

export default Search
