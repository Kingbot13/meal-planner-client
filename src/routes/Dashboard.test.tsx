import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Dashboard } from './Dashboard';
import { renderWithProviders } from '../app/testUtils';


const userE = userEvent.setup();

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

        renderWithProviders(<Dashboard />);

        const user = await screen.findByText(/Welcome John/i);

        expect(user).toHaveTextContent(/Welcome John/i);
    })

    it("renders RecipeForm when create recipe button is clicked", async () => {
       
        renderWithProviders(<Dashboard />);

        const button = screen.getByText(/New Recipe/i, {selector: 'button'});

        await userE.click(button);

        expect(screen.getByRole('form')).toBeInTheDocument();
    })

})