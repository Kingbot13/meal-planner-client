import {render, screen, waitFor, cleanup, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Dashboard } from './Dashboard';
import { renderWithProviders } from '../app/testUtils';


const userE = userEvent.setup();

describe('Dashboard guest mode', () => {
  afterEach(() => cleanup());

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
  afterEach(() => cleanup());

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

        const user = await screen.findByText(/Welcome John/i, {}, {timeout: 700});

        expect(user).toHaveTextContent(/Welcome John/i);
    })

    it("renders RecipeForm when create recipe button is clicked", async () => {
       
        renderWithProviders(<Dashboard />);

        const button = screen.getByText(/New Recipe/i, {selector: 'button'});

        await act(async () => {
            await userE.click(button);
        })


        expect(screen.getByRole('form')).toBeInTheDocument();
    })

});

describe("RecipeForm in Dashboard", () => {
  afterEach(() => cleanup());


    it("changes input value to match user input", async () => {
        renderWithProviders(<Dashboard />);

        const button = screen.getByRole('button', {name: /New Recipe/i});

        // display RecipeForm
        await act(async () => {
            await userE.click(button);

        })

        const ingredientName = screen.getByRole('textbox', {name: /Ingredient Name/i});
        const ingredientMeasurement = screen.getByRole('textbox', {name: /Measurement/i});
        const recipeStep = screen.getByRole('textbox', {name: /Recipe Step/i});

        await act(async () => {
            await userE.click(ingredientName);
            await userE.keyboard('chicken');
    
            await userE.click(ingredientMeasurement);
            await userE.keyboard('1');
            
            await userE.click(recipeStep);
            await userE.keyboard('preheat oven');

        })

        expect(ingredientName).toHaveValue('chicken');
        expect(ingredientMeasurement).toHaveValue('1');
        expect(recipeStep).toHaveValue('preheat oven');

    });


})