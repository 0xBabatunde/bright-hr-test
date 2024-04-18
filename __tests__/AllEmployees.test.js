import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AllEmployees from '@/components/AllEmployees';

// Mock data for testing
const mockData = [
    {
        id: '1',
        employee: { firstName: 'Amiah', lastName: 'Fenton' },
        startDate: '2023/04/15',
        approved: true,
        absenceType: 'MEDICAL',
        days: 5,
    },
    {
        id: '2',
        employee: { firstName: 'Raniya', lastName: 'Frederickson' },
        startDate: '2023/04/20',
        approved: false,
        absenceType: 'ANNUAL_LEAVE',
        days: 3,
    },
];

describe('All Employees', () => {
    test('renders all employee cards correctly', () => {
        render(<AllEmployees data={mockData} />);

        // Check if the employee card component renders
        const allEmployeeCards = screen.getAllByTestId('allemployees-card');
        expect(allEmployeeCards.length).toBe(1);
        waitFor(() => expect(allEmployeeCards).toHaveTextContent('Amiah Fenton'));
        waitFor(() => expect(allEmployeeCards).toHaveTextContent('APPROVED'));
        waitFor(() => expect(allEmployeeCards).toHaveTextContent('ANNUAL LEAVE'));
    });
});