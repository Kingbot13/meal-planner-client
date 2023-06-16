import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { LogIn } from './routes/LogIn';
import ErrorPage from './ErrorPage';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Register } from './routes/Register';
import { Home } from './routes/Home';
import { Dashboard } from './routes/Dashboard';
import { RecipeBook } from './routes/RecipeBook';

// if (process.env.NODE_ENV === 'development') {
//   const {worker} = require('./mocks/browser.ts');
//   worker.start();
// }

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/user/:userId",
        element: <Dashboard />,
        
      },
      {
        path: "/user/:userId/recipes",
        element: <RecipeBook />
      }
    ]
  },
  {
    path: "/login",
    element: <LogIn />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />
  }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
