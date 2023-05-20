import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Dashboard } from './Dashboard';
import { store, setupStore } from '../app/store';
import { Provider } from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import { renderWithProviders } from '../app/testUtils';
import {rest} from 'msw';
import {server} from '../setupTests';

describe('Dashboard guest mode', () => {
    // render(
    //     <MemoryRouter initialEntries={['/users/guest']} >
    //         <Provider store={store}>
    //             <Dashboard />
    //         </Provider>
    //     </MemoryRouter>
    // );

    renderWithProviders(<Dashboard />, {
        preloadedState: {
            guest: {isGuest: true, recipes: []}
        }
    })

    it('is in guest mode', () => {

        expect(screen.getByRole('heading',{level: 1})).toHaveTextContent('Welcome Guest');
    });
});

describe('Dashboard', () => {
    const apiData = {
        firstName: 'John',
        lastName: 'Doe',
        recipes: [],
        _id: '123',
        shuffledRecipes: []
    };

    it("displays 'Loading user' while loading data", () => {
        renderWithProviders(<Dashboard />);

        expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(/Loading user/i);
    })

    it("displays user's name", async () => {

        // server.use(
        //     rest.get('*', (req, res, ctx) => {
        //         return res(ctx.json(apiData))
        //     })
        // )

        const {getByText} = renderWithProviders(<Dashboard />);

        const user = await screen.findByText(/Welcome John/i,{},{timeout: 700});

        expect(user).toHaveTextContent(/Welcome John/i);

    //    await waitFor(() =>{
    //     expect(getByText(/welcome John Doe/i)).toBeInTheDocument();
    //    } ); 
    })

})