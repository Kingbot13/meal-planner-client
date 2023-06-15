import {screen, cleanup, act, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Dashboard } from '../routes/Dashboard';
import { renderWithProviders } from '../app/testUtils';


const userE = userEvent.setup();


describe("FolderTab", () => {
    afterEach(() => cleanup());

    it("has class 'folder-active' after p element clicked", async() => {
        renderWithProviders(<Dashboard />);
        const tab = screen.getByText(/today/i);
        const folder = screen.getByTestId(/ft-today/i);

        await userE.click(tab);

        expect(folder).toHaveClass('folder-active');
    })
})