import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchBar from '.'

describe('renders autocomplete suggestions', () => {
  const setUp = () => {
    render(<SearchBar />)
  }

  test('hides autocomplete suggestions without mouseover event', async () => {
    setUp()
    const suggestionsList = screen.queryByRole('list')
    expect(suggestionsList).not.toBeInTheDocument()
  })

  test('hides autocomplete suggestions without input changes', async () => {
    setUp()
    const inputElement = screen.queryByRole('textbox', { name: /searchInput/i })

    fireEvent.mouseOver(inputElement)

    const suggestionsList = screen.queryByRole('list', {
      name: /suggestionList/i,
    })
    expect(suggestionsList).not.toBeInTheDocument()
  })

  test('show autocomplete suggestions on input changes and mouseover', async () => {
    setUp()
    const inputElement = screen.queryByRole('textbox', { name: /searchInput/i })
    fireEvent.change(inputElement, { target: { value: 'godfather' } })
    expect(inputElement.value).toBe('godfather')

    fireEvent.mouseOver(inputElement)

    await waitFor(() => {
      const suggestionsList = screen.queryByRole('list', {
        name: /suggestionList/i,
      })
      expect(suggestionsList).toBeInTheDocument()
    })

    await waitFor(() => {
      const suggestionItems = screen.queryAllByRole('listitem', {
        name: /suggestionItem/i,
      })
      expect(suggestionItems).toHaveLength(5)
    })
  })
})
