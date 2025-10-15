
import React from 'react';
import PayrollForm from './PayrollForm';
import Card from './common/Card';
import { type Payroll } from '../types';

interface DashboardPageProps {
  onPayrollAdded?: () => void;
  onPayrollUpdated?: () => void;
  addPayroll?: (payroll: Omit<Payroll, 'id'>) => void;
  updatePayroll?: (id: string, payroll: Payroll) => void;
  payrollToEdit?: Payroll | null;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  onPayrollAdded,
  onPayrollUpdated,
  addPayroll,
  updatePayroll,
  payrollToEdit,
}) => {
  const isEditing = !!payrollToEdit;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditing ? 'Edit Payroll Record' : 'New Payroll Entry'}
      </h2>
      <Card>
        <PayrollForm
          onPayrollAdded={onPayrollAdded}
          onPayrollUpdated={onPayrollUpdated}
          addPayroll={addPayroll}
          updatePayroll={updatePayroll}
          payrollToEdit={payrollToEdit}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
