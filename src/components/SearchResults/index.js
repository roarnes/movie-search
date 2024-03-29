import './searchResults.scss'
import MovieThumbnail from '../MovieThumbnail'

const SearchResults = (props) => {
  const { results = [] } = props
  return (
    <div className="searchResults" role="list" aria-label="searchResults">
      {results.map((result, index) => (
        <MovieThumbnail detail={result} key={`movie-thumbnail-${index}`} />
      ))}
    </div>
  )
}

export default SearchResults
