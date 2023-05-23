// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'



export const handlers = [
  rest.get("https://mealplanner.onrender.com/api/users/:userId", (_req, res, ctx) => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      recipes: [],
      _id: '123',
      shuffledRecipes: []
  }
    return res(ctx.json(user),
        ctx.status(200))
  }),
  rest.post("https://mealplanner.onrender.com/api/user/:userId/recipes", (req, res, ctx) => {
    const recipe = {
      name: 'Baked Chicken',
      _id: '123',
      steps: ['preheat oven', 'put chicken in oven', 'take chicken out of oven'],
      ingredients: [{name: 'chicken', measurement: '1 lbs'}]
    }
    return res(ctx.status(200), ctx.json({recipe}))
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
