import { useState } from 'react'

const useMovieAutoComplete = () => {
  const [movieAutoCompleteList, setMovieAutoCompleteList] = useState([])
  const limit = 5

  const handleFetchMovieAutoComplete = async ({ keyword }) => {
    const apiEndpoint = 'https://api.movies.dcts.se/rpc/movies_autocomplete'

    const response = await fetch(`${apiEndpoint}?q=${keyword}&limit=${limit}`, {
      method: 'GET',
    })
    const responseJson = await response.json()

    setMovieAutoCompleteList(responseJson)
  }

  const resetMovieAutoCompleteList = () => {
    setMovieAutoCompleteList([])
  }

  return {
    handleFetchMovieAutoComplete,
    movieAutoCompleteList,
    resetMovieAutoCompleteList,
  }
}

export default useMovieAutoComplete
