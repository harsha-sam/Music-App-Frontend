import React from 'react';
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import Musix from "../../assets/Musix-logo-white.png";
import "./SidebarOption.css";
import "./Sidebar.css";

function Sidebar({playlists}) {
    return (
        <section className="sidebar">
            <img
                className="sidebar__logo"
                // src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                src={Musix}
                alt="Spotify logo"
            />
            <SidebarOption title="Home" Icon={HomeIcon} route={"/"}/>
            <SidebarOption title="Search & Lyrics" Icon={SearchIcon} route={"/search"}/>
            <SidebarOption title="Your Library" Icon={LibraryMusicIcon} route={"/"}/>
            <br></br>
            <SidebarOption title="Create Playlist" Icon={AddBoxIcon} IconColor={grey['300']} route={"/"}/>
            <SidebarOption title="Liked Songs" Icon={FavoriteRoundedIcon} IconColor={red['900']} 
            route={"/"}
            />
            <hr className="divider"></hr>
            
            <strong className="mb-3">PUBLIC PLAYLISTS</strong>
            <div className="playlists">
                {playlists?.items?.map((playlist) => {
                    return <SidebarOption key={playlist.uri} title={playlist.name} route={`/playlists/${playlist.id}`}/>
                })}
            </div>
        </section>
    )
}

function SidebarOption({title, Icon, IconColor, route="/"}) {
    return(
        <Link className="sidebarOption ml-1" to={route}>
            {Icon && <Icon style={{ color: IconColor }} className="sidebarOption_icon" />}
            {Icon ? <h4>{title}</h4>:<p>{title}</p>}
        </Link>
    )
}
export default Sidebar
