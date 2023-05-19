import '@testing-library/jest-dom'
import { fetch, Headers, Request, Response } from 'cross-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

global.fetch = fetch
global.Headers = Headers
global.Request = Request
global.Response = Response

export const handlers = [
  rest.get('"https://mealplanner.onrender.com/api/user/123"', (_req, res, ctx) => {
    return res(ctx.json({user: {
        firstName: 'John',
        lastName: 'Doe',
        recipes: [],
        _id: '123',
        shuffledRecipes: []
    }}))
  }),
]

export const server = setupServer(...handlers)

// Enable the API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable the API mocking after the tests finished.
afterAll(() => server.close())