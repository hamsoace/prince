import { useState, useCallback, useEffect } from 'react';
import { type Payroll } from '../types';
import * as db from '../services/db';

/**
 * A note on data persistence:
 * This application now uses a mock database service (`services/db.ts`) that
 * uses the browser's localStorage to persist data. This allows the app
 * to function without a backend server.
 */
export const usePayroll = () => {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPayrolls = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await db.getAllPayrolls();
        setPayrolls(data);
      } catch (e) {
        setError('Failed to load payroll data.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadPayrolls();
  }, []);

  const getPayrolls = useCallback(() => {
    return payrolls;
  }, [payrolls]);

  const getPayrollById = useCallback((id: string): Payroll | undefined => {
    return payrolls.find(p => p.id === id);
  }, [payrolls]);

  const addPayroll = useCallback(async (newPayrollData: Omit<Payroll, 'id'>) => {
    try {
        setError(null);
        const newPayroll = await db.addPayrollToDb(newPayrollData);
        setPayrolls(prev => [...prev, newPayroll]);
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        setError(`Failed to add payroll record: ${errorMessage}`);
        console.error(e);
    }
  }, []);

  const updatePayroll = useCallback(async (id: string, updatedData: Payroll) => {
    try {
        setError(null);
        const updatedPayroll = await db.updatePayrollInDb(updatedData);
        setPayrolls(prev => prev.map(p => p.id === id ? updatedPayroll : p));
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        setError(`Failed to update payroll record: ${errorMessage}`);
        console.error(e);
    }
  }, []);

  const deletePayroll = useCallback(async (id: string) => {
    if (window.confirm('Are you sure you want to delete this payroll record?')) {
      try {
        setError(null);
        await db.deletePayrollFromDb(id);
        setPayrolls(prev => prev.filter(p => p.id !== id));
      } catch (e) {
          const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
          setError(`Failed to delete payroll record: ${errorMessage}`);
          console.error(e);
      }
    }
  }, []);
  
  const isPayrollNumberUnique = useCallback((payrollNumber: string, currentId?: string) => {
    return !payrolls.some(p => p.payrollNumber === payrollNumber && p.id !== currentId);
  }, [payrolls]);

  return { payrolls, loading, error, getPayrolls, getPayrollById, addPayroll, updatePayroll, deletePayroll, isPayrollNumberUnique };
};
