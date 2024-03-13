import './App.scss'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import useMovieSearch from './hooks/useMovieSearch'

const App = () => {
  const {
    handleFetchMovieSearch,
    movieSearchResults,
    resetMovieSearchResults,
  } = useMovieSearch()

  const handleSearchMovie = (keyword) => {
    if (!keyword) {
      resetMovieSearchResults()
      return
    }
    handleFetchMovieSearch({ keyword })
  }

  const showResults = movieSearchResults && movieSearchResults.length > 0

  return (
    <div className="App">
      <SearchBar onSearch={handleSearchMovie} />
      {showResults && <SearchResults results={movieSearchResults} />}
    </div>
  )
}

export default App
