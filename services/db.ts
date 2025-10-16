import { type Payroll } from '../types';

const API_BASE_URL = 'https://prince-backend-0qch.onrender.com/api';

/**
 * Fetches all payroll records from the server.
 */
export const getAllPayrolls = async (): Promise<Payroll[]> => {
    const response = await fetch(`${API_BASE_URL}/payrolls`);
    if (!response.ok) {
        throw new Error('Failed to fetch payrolls');
    }
    return response.json();
};

/**
 * Adds a new payroll record to the database via the server.
 */
export const addPayrollToDb = async (newPayrollData: Omit<Payroll, '_id'>): Promise<Payroll> => {
    const response = await fetch(`${API_BASE_URL}/payrolls`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPayrollData),
    });
    if (!response.ok) {
        throw new Error('Failed to add payroll');
    }
    return response.json();
};

/**
 * Updates an existing payroll record on the server.
 */
export const updatePayrollInDb = async (updatedPayroll: Payroll): Promise<Payroll> => {
    if (!updatedPayroll._id) {
        throw new Error('Payroll ID is required for update');
    }
    const response = await fetch(`${API_BASE_URL}/payrolls/${updatedPayroll._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPayroll),
    });
    if (!response.ok) {
        throw new Error('Failed to update payroll');
    }
    return response.json();
};

/**
 * Deletes a payroll record from the server.
 */
export const deletePayrollFromDb = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/payrolls/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete payroll');
    }
};