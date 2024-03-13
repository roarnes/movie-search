import './movieThumbnail.scss'

const MovieThumbnail = (props) => {
  const { detail } = props
  const { title, overview, poster, runtime, genres } = detail
  return (
    <div className="movieThumbnail">
      <img src={poster} alt={`${title} movie poster`} />
      <div className="details">
        <h2>{title}</h2>
        <p>Duration: {runtime}m</p>
        <p>Genres: {genres?.join(', ')}</p>
        <p className="overview">{overview}</p>
      </div>
    </div>
  )
}

export default MovieThumbnail
