import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import EmployeeCard from '@/components/EmployeeCard';


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

describe('Employee', () => {
    test('renders employee cards correctly', () => {
        render(<EmployeeCard data={mockData} />);

        // Check if the employee card component renders
        const employeeCards = screen.getAllByTestId('employee-card');
        expect(employeeCards.length).toBe(1);
        waitFor(() => expect(employeeCards).toHaveTextContent('Amiah Fenton'));
        waitFor(() => expect(employeeCards).toHaveTextContent('APPROVED'));
        waitFor(() => expect(employeeCards).toHaveTextContent('ANNUAL LEAVE'));
    });
});