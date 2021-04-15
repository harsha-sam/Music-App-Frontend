import React, { useState, useEffect } from 'react'

function Search({ spotifyApi, chooseTrack }) {
    const [search, setSearch] = useState(null);
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
            <div className="searchResults">
                {searchResults.map((track) => {
                    return <div key={track.uri} className="track" onClick={() => chooseTrack(track.uri)}>
                        <img src={track.albumUrl} alt={track.title}/>
                        <h5>{track.title}</h5>
                        <h6>{track.artist}</h6>
                    </div>
                })}
            </div>
        </section>
    )
}

export default Search
