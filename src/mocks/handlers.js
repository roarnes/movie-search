import { rest } from 'msw'
import { movieAutoCompleteResponse, movieSearchResponse } from './responseData'

const movieSearchEndpoint = 'https://api.movies.dcts.se/rpc/movies_search'
const movieAutoCompleteEndpoint =
  'https://api.movies.dcts.se/rpc/movies_autocomplete'

export const handlers = [
  rest.get(movieSearchEndpoint, (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit')
    const query = req.url.searchParams.get('q')

    let responseData
    if (query === 'godfather') {
      responseData = movieSearchResponse.slice(0, limit)
    } else {
      responseData = movieSearchResponse.filter(
        (movie) => movie.title === query,
      )
    }

    return res(ctx.status(200), ctx.json(responseData))
  }),
  rest.get(movieAutoCompleteEndpoint, (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit')
    return res(
      ctx.status(200),
      ctx.json(movieAutoCompleteResponse.slice(0, limit)),
    )
  }),
]
