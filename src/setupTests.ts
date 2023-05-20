// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import { rest, setupWorker } from 'msw'
import { setupServer } from 'msw/node'



export const handlers = [
  rest.get("https://mealplanner.onrender.com/api/users/:userId", (_req, res, ctx) => {
    return res(ctx.json({user: {
        firstName: 'John',
        lastName: 'Doe',
        recipes: [],
        _id: '123',
        shuffledRecipes: []
    }}),
        ctx.status(200))
  }),
  rest.get("https://mealplanner.onrender.com/api/user/123/recipes", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}))
  })
]

export const server = setupServer(...handlers)

// export const worker = setupWorker(...handlers);

// Enable the API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable the API mocking after the tests finished.
afterAll(() => server.close())
