import React from 'react'

function Home({ newReleases }) {
    if (!newReleases) {
        return <h3>Loading...</h3>
    }
    return (
        <section>
            <h2>New Releases</h2>
            <hr className="divider" />
            <div className="trackCard-container">
                {newReleases.albums.items.map((album) => {
                    return <Card key={album.id} imageUrl={album.images[1].url} title={album.name} artist={album.artists[0].name} />
                })}
            </div>
        </section>
    )
}

const Card = (({ imageUrl, title, artist, url }) => {
    return <article className="trackCard">
        <img src={imageUrl} alt={title} />
        <h5 className="mt-4">{title}</h5>
        <small>{artist}</small>
    </article>
})

export default Home