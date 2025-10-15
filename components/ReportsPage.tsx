
import React, { useState, useMemo } from 'react';
import ReportsTable from './ReportsTable';
import Card from './common/Card';
import Input from './common/Input';
import { type Payroll } from '../types';

interface ReportsPageProps {
  payrolls: Payroll[];
  onNavigate: (view: 'DASHBOARD') => void;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ payrolls, onViewDetails, onEdit, onDelete }) => {
  const [filter, setFilter] = useState({ month: '', year: '' });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filteredPayrolls = useMemo(() => {
    return payrolls.filter(p => {
      const payrollDate = new Date(p.date);
      const yearMatch = filter.year ? payrollDate.getFullYear().toString() === filter.year : true;
      const monthMatch = filter.month ? p.month.toLowerCase().includes(filter.month.toLowerCase()) : true;
      return yearMatch && monthMatch;
    });
  }, [payrolls, filter]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Payroll Reports</h2>
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-md">
            <Input id="monthFilter" name="month" label="Filter by Month" placeholder="e.g., July" value={filter.month} onChange={handleFilterChange} />
            <Input id="yearFilter" name="year" label="Filter by Year" placeholder="e.g., 2024" value={filter.year} onChange={handleFilterChange} />
        </div>
        <ReportsTable
          payrolls={filteredPayrolls}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Card>
    </div>
  );
};

export default ReportsPage;
