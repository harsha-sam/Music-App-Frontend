import React, { useContext } from 'react';
import { SET_PLAYING_TRACKS } from "../../store/actions";
import { DispatchContext } from "../../App";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import "./Playlists.css"

function millisToMinsAndSecs(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (
        seconds === 60 ?
            (minutes + 1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
}

const Playlists = ({tracks, title, artist, image}) => {
    const { dispatch } = useContext(DispatchContext);
    return (
        <main>
            <div className="track mb-3">
                <img src={image} alt={title}/>
                <div className="ml-4">
                    <h2 className="mb-3">{title}</h2>
                    <h5 className="ml-1 color-gray">{artist}</h5>
                </div>
            </div>
            <div className="playlistsContainer">
                <div className="trackRow">
                    <span className="index">#</span>
                    <span className="name">Title</span>
                    <AccessTimeIcon />
                </div>
                <hr className="divider" />
                <div className="playlistTracks">
            
                  {
                      tracks.map((track, index) => {
                          return <div key={track.uri} className="trackRow" onClick={() => {
                              dispatch({ type: SET_PLAYING_TRACKS, payLoad: track})
                          }}>
                              <span className="index">{index + 1}</span>
                              <span className="name">{track.title}</span>
                              <span>{millisToMinsAndSecs(track.duration_ms)}</span>
                          </div>
                      })
                  }
                </div>
            </div>
        </main>
    )
}
export default Playlists;