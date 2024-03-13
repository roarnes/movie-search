import { useState, useEffect, useRef } from 'react'
import './searchBar.scss'
import useMovieAutoComplete from '../../hooks/useMovieAutoComplete'

const SearchBar = (props) => {
  const { onSearch = () => {} } = props

  const inputRef = useRef(null)
  const [searchInput, setSearchInput] = useState('')
  const [isMouseOver, setIsMouseOver] = useState('')

  const {
    handleFetchMovieAutoComplete,
    movieAutoCompleteList,
    resetMovieAutoCompleteList,
  } = useMovieAutoComplete()

  const handleInputChange = (inputValue) => {
    const inputKeyword = inputValue.trim()

    setSearchInput(inputKeyword)

    if (!inputKeyword) {
      resetMovieAutoCompleteList()
    }
  }

  useEffect(() => {
    if (!searchInput) return
    handleFetchMovieAutoComplete({ keyword: searchInput })
  }, [searchInput])

  const handleInputKeyDown = (key) => {
    if (key === 'Enter') {
      onSearch(searchInput)
    }
  }

  const handleAutoCompleteClick = (movie) => {
    setSearchInput(movie)

    const inputElement = inputRef?.current
    if (inputElement) {
      inputElement.value = movie
      inputElement.focus()
    }
    onSearch(movie)
  }

  const handleSearchButtonClick = () => onSearch(searchInput)

  const showSuggestions =
    isMouseOver && movieAutoCompleteList && movieAutoCompleteList.length > 0

  return (
    <div
      className="searchBar"
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div className="autocomplete">
        <input
          type="text"
          ref={inputRef}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => handleInputKeyDown(e.key)}
          name="searchInput"
          aria-label="searchInput"
        />
        {showSuggestions && (
          <div className="suggestions" role="list" aria-label="suggestionList">
            {movieAutoCompleteList.map((movie, index) => (
              <div
                className="suggestionItem"
                role="listitem"
                aria-label="suggestionItem"
                key={`movie-option-${index}`}
                onClick={() => handleAutoCompleteClick(movie)}
              >
                {movie}
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={handleSearchButtonClick}>Search</button>
    </div>
  )
}

export default SearchBar
