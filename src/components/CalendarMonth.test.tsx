import {screen, cleanup, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Dashboard } from '../routes/Dashboard';
import { renderWithProviders } from '../app/testUtils';


const userE = userEvent.setup();


describe("CalendarMonth", () => {
    afterEach(() => cleanup());

    it('exists', () => {
        renderWithProviders(<Dashboard />);

        expect(screen.getByTestId('cm')).toBeInTheDocument();
    })
    
})