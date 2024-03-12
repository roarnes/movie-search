import { useState } from 'react'

const useMovieSearch = () => {
  const [movieSearchList, setMovieSearchList] = useState([])
  const limit = 50

  const handleFetchMovieSearch = async ({ keyword }) => {
    const apiEndpoint = 'https://api.movies.dcts.se/rpc/movies_search'

    const response = await fetch(`${apiEndpoint}?q=${keyword}&limit=${limit}`, {
      method: 'GET',
    })
    const responseJson = await response.json()

    setMovieSearchList(responseJson)
  }

  const resetMovieSearchList = () => {
    setMovieSearchList([])
  }

  return {
    handleFetchMovieSearch,
    movieSearchList,
    resetMovieSearchList,
  }
}

export default useMovieSearch
