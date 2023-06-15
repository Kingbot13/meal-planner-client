import {screen, cleanup, act} from '@testing-library/react';
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
    });

    it("removes class 'folder-active' after different p element clicked", async() => {
        renderWithProviders(<Dashboard />);
        const tab = screen.getByText(/week/i);
        const folder = screen.getByTestId(/ft-week/i);
        const tab2 = screen.getByText(/today/i);
        const folder2 = screen.getByTestId(/ft-today/i);

        await userE.click(tab);
        await userE.click(tab2);

        expect(folder).not.toHaveClass('folder-active');
        expect(folder2).toHaveClass('folder-active');
    })
})