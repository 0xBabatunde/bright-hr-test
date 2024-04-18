import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

const mockData = [
    {
        id: '1',
        employee: { firstName: 'Amiah', lastName: 'Fenton' },
        startDate: '2023/04/15',
        approved: true,
        absenceType: 'MEDICAL',
        days: 5,
        conflicts: false,
    },
    {
        id: '2',
        employee: { firstName: 'Raniya', lastName: 'Frederickson' },
        startDate: '2023/04/20',
        approved: false,
        absenceType: 'ANNUAL_LEAVE',
        days: 3,
        conflicts: true,
    },
];

describe('Home', () => {
    it('renders multiple employee cards', () => {
        render(<Home data={mockData} conflict={mockData} />);
        const items = screen.getAllByText(/Start/i); // Array of matched elements
        expect(items.length).toBeGreaterThanOrEqual(2); // Check for at least 2 items
    });
})