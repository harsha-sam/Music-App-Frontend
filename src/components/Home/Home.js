import React, { useContext } from 'react'
import { StateContext } from "../../App.js";
import { Link } from "react-router-dom";

function Home() {
    const { state } = useContext(StateContext);
    const { newReleases } = state;
    if (!newReleases) {
        return <h3>Loading...</h3>
    }
    return (
        <section>
            <h2>New Releases</h2>
            <hr className="divider" />
            <div className="trackCard-container">
                {newReleases.albums.items.map((album) => {
                    return <Card key={album.id} imageUrl={album.images[1].url} title={album.name} artist={album.artists[0].name} 
                        id={album.id}
                    />
                })}
            </div>
        </section>
    )
}

const Card = (({ imageUrl, title, artist, id }) => {
    return <Link to={`/album/${id}`}>
        <article className="trackCard">
            <img src={imageUrl} alt={title} />
            <h5 className="mt-4">{title}</h5>
            <small>{artist}</small>
        </article>
    </Link>
})

export default Home