import { useState } from 'react'

const useMovieSearch = () => {
  const [movieSearchResults, setMovieSearchResults] = useState([])
  const limit = 50

  const handleFetchMovieSearch = async ({ keyword }) => {
    const apiEndpoint = 'https://api.movies.dcts.se/rpc/movies_search'

    const response = await fetch(`${apiEndpoint}?q=${keyword}&limit=${limit}`, {
      method: 'GET',
    })
    const responseJson = await response.json()

    setMovieSearchResults(responseJson)
  }

  const resetMovieSearchResults = () => {
    setMovieSearchResults([])
  }

  return {
    handleFetchMovieSearch,
    movieSearchResults,
    resetMovieSearchResults,
  }
}

export default useMovieSearch
