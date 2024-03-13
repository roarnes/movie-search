import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import { movieSearchResponse } from './mocks/responseData'

test('renders search bar', () => {
  render(<App />)
  const inputElement = screen.queryByRole('textbox', { name: /searchInput/i })
  expect(inputElement).toBeInTheDocument()

  const searchButton = screen.queryByRole('button', { name: /Search/i })
  expect(searchButton).toBeInTheDocument()
})

test('does not render search results without a search', () => {
  render(<App />)
  const list = screen.queryByRole('list', { name: /searchResult/i })
  expect(list).not.toBeInTheDocument()

  const listItem = screen.queryByRole('listitem', { name: /searchResultItem/i })
  expect(listItem).not.toBeInTheDocument()
})

describe('render search results with a valid search', () => {
  const setUp = () => {
    render(<App />)
    const inputElement = screen.queryByRole('textbox', { name: /searchInput/i })
    fireEvent.change(inputElement, { target: { value: 'godfather' } })
    expect(inputElement.value).toBe('godfather')
    fireEvent.mouseOver(inputElement)
  }

  test('on enter key down', async () => {
    setUp()
    const inputElement = screen.queryByRole('textbox', { name: /searchInput/i })
    fireEvent.keyDown(inputElement, { key: 'Enter' })

    await waitFor(() => {
      const list = screen.queryByRole('list', { name: /searchResults/i })
      expect(list).toBeInTheDocument()
    })

    await waitFor(() => {
      const listItem = screen.queryAllByRole('listitem', {
        name: /searchResultItem/i,
      })
      expect(listItem).toHaveLength(movieSearchResponse.length)
    })
  })

  test('on search button click', async () => {
    setUp()
    const searchButton = screen.queryByRole('button', { name: /Search/i })
    fireEvent.click(searchButton)

    await waitFor(() => {
      const list = screen.queryByRole('list', { name: /searchResults/i })
      expect(list).toBeInTheDocument()
    })

    await waitFor(() => {
      const listItem = screen.queryAllByRole('listitem', {
        name: /searchResultItem/i,
      })
      expect(listItem).toHaveLength(movieSearchResponse.length)
    })
  })

  test('on suggestion item click', async () => {
    setUp()
    let suggestionItem
    await waitFor(() => {
      suggestionItem = screen.getByText(/El padrino: The Latin Godfather/i, {
        selector: 'div',
      })
      expect(suggestionItem).toBeInTheDocument()
    })

    fireEvent.click(suggestionItem)

    await waitFor(() => {
      const listItemTitle = screen.getByText(
        /El padrino: The Latin Godfather/i,
        { selector: 'h2' },
      )
      expect(listItemTitle).toBeInTheDocument()
    })
  })
})
