import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SignatureField from './SignatureField';
import Input from './common/Input';
import Button from './common/Button';
import Select from './common/Select';
import { type Payroll, type Earnings, type Deductions } from '../types';
import { INITIAL_PAYROLL_STATE, MONTHS } from '../constants';
import { usePayroll } from '../hooks/usePayroll';

interface PayrollFormProps {
  onPayrollAdded?: () => void;
  onPayrollUpdated?: () => void;
  addPayroll?: (payroll: Omit<Payroll, 'id'>) => void;
  updatePayroll?: (id: string, payroll: Payroll) => void;
  payrollToEdit?: Payroll | null;
}

const PayrollForm: React.FC<PayrollFormProps> = ({
  onPayrollAdded,
  onPayrollUpdated,
  addPayroll,
  updatePayroll,
  payrollToEdit,
}) => {
  const [formData, setFormData] = useState<Omit<Payroll, 'id' | 'grossPay' | 'totalDeductions' | 'netPay'>>(() => 
    payrollToEdit ? { ...payrollToEdit } : { ...INITIAL_PAYROLL_STATE, payrollNumber: `POP${Math.floor(1000 + Math.random() * 9000)}` }
  );
  const [error, setError] = useState('');

  const { isPayrollNumberUnique } = usePayroll();

  useEffect(() => {
    if (payrollToEdit) {
      setFormData({ ...payrollToEdit });
    }
  }, [payrollToEdit]);

  const grossPay = useMemo(() => {
    // FIX: Operator '+' cannot be applied to types 'unknown' and 'number'. Using Object.keys for a type-safe sum reduction.
    return (Object.keys(formData.earnings) as Array<keyof Earnings>).reduce((sum, key) => sum + (formData.earnings[key] || 0), 0);
  }, [formData.earnings]);

  const totalDeductions = useMemo(() => {
    // FIX: Operator '+' cannot be applied to types 'unknown' and 'number'. Using Object.keys for a type-safe sum reduction.
    return (Object.keys(formData.deductions) as Array<keyof Deductions>).reduce((sum, key) => sum + (formData.deductions[key] || 0), 0);
  }, [formData.deductions]);

  const netPay = useMemo(() => grossPay - totalDeductions, [grossPay, totalDeductions]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumericInputChange = (category: 'earnings' | 'deductions') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? 0 : parseFloat(value);
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: isNaN(numericValue) ? 0 : numericValue
      }
    }));
  };
  
  const handleSignatureChange = useCallback((signature: string, initials: string) => {
    setFormData(prev => ({...prev, signature, initials}));
  },[]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isPayrollNumberUnique(formData.payrollNumber, payrollToEdit?.id)) {
        setError('Payroll Number must be unique.');
        return;
    }
    if (formData.initials.length > 3) {
        setError('Initials cannot be more than 3 characters.');
        return;
    }
    if (!formData.signature) {
        setError('Signature is required.');
        return;
    }


    const completePayrollData: Omit<Payroll, 'id'> = {
        ...formData,
        grossPay,
        totalDeductions,
        netPay,
    };

    if (payrollToEdit && updatePayroll) {
        updatePayroll(payrollToEdit.id, { ...completePayrollData, id: payrollToEdit.id });
        onPayrollUpdated?.();
    } else if (addPayroll) {
        addPayroll(completePayrollData);
        onPayrollAdded?.();
    }
  };

  const renderSection = (title: string, fields: React.ReactNode) => (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-blue-800 border-b border-blue-200 pb-2 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      {renderSection('Employee Information',
        <>
          <Input id="firstName" name="firstName" label="First Name" value={formData.firstName} onChange={handleInputChange} required />
          <Input id="lastName" name="lastName" label="Last Name" value={formData.lastName} onChange={handleInputChange} required />
          <Input id="date" name="date" label="Date" type="date" value={formData.date} onChange={handleInputChange} required />
          <Input id="payrollNumber" name="payrollNumber" label="Payroll Number" value={formData.payrollNumber} onChange={handleInputChange} required />
          <Select 
            id="month" 
            name="month" 
            label="Month" 
            value={formData.month} 
            onChange={handleInputChange} 
            options={MONTHS.map(m => ({ value: m, label: m }))} 
            required 
          />
          <Input id="pinNo" name="pinNo" label="PIN No." value={formData.pinNo} onChange={handleInputChange} required />
          <Input id="nssfNo" name="nssfNo" label="NSSF No." value={formData.nssfNo} onChange={handleInputChange} required />
          <Input id="shaNo" name="shaNo" label="SHA No." value={formData.shaNo} onChange={handleInputChange} required />
        </>
      )}
      
      {renderSection('Earnings',
        Object.keys(formData.earnings).map(key => (
          <Input key={key} id={key} name={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} type="number" value={formData.earnings[key as keyof Earnings]} onChange={handleNumericInputChange('earnings')} required />
        ))
      )}
      
      {renderSection('Deductions',
        Object.keys(formData.deductions).map(key => (
          <Input key={key} id={key} name={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} type="number" value={formData.deductions[key as keyof Deductions]} onChange={handleNumericInputChange('deductions')} required />
        ))
      )}

      <div className="mt-8 bg-blue-50 p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
            <p className="text-sm text-gray-600">Gross Pay</p>
            <p className="text-2xl font-bold text-green-600">Kshs {grossPay.toFixed(2)}</p>
        </div>
        <div>
            <p className="text-sm text-gray-600">Total Deductions</p>
            <p className="text-2xl font-bold text-red-600">Kshs {totalDeductions.toFixed(2)}</p>
        </div>
        <div>
            <p className="text-sm font-medium text-gray-800">Net Pay</p>
            <p className="text-3xl font-extrabold text-blue-800">Kshs {netPay.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium text-blue-800 border-b border-blue-200 pb-2 mb-4">Signature</h3>
        <SignatureField onSignatureChange={handleSignatureChange} initialSignature={formData.signature} initialInitials={formData.initials} />
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      <div className="mt-8 flex justify-end">
        <Button type="submit">
            {payrollToEdit ? 'Update Payroll' : 'Save Payroll'}
        </Button>
      </div>
    </form>
  );
};

export default PayrollForm;
