import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import "./SidebarOption.css";
import "./Sidebar.css";

function Sidebar({playlists}) {
    return (
        <section className="sidebar">
            <img
                className="sidebar__logo"
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                alt="Spotify logo"
            />
            <SidebarOption title="Home" Icon={HomeIcon}/>
            <SidebarOption title="Search" Icon={SearchIcon}/>
            <SidebarOption title="Your Library" Icon={LibraryMusicIcon}/>
            <br></br>
            <SidebarOption title="Create Playlist" Icon={AddBoxIcon} IconColor={grey['300']}/>
            <SidebarOption title="Liked Songs" Icon={FavoriteRoundedIcon} IconColor={red['900']}/>
            <hr className="divider"></hr>
            {playlists?.items?.map((playlist) => {
                return <SidebarOption title={playlist.name} />
            })}
        </section>
    )
}

function SidebarOption({title, Icon, IconColor}) {
    return(
        <div className="sidebarOption">
            {Icon && <Icon style={{ color: IconColor }} className="sidebarOption_icon" />}
            {Icon ? <h4>{title}</h4>:<p>{title}</p>}
        </div>
    )
}
export default Sidebar
