import React from 'react';
import Button from './common/Button';
import { type Payroll } from '../types';

interface ReportsTableProps {
  payrolls: Payroll[];
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ReportsTable: React.FC<ReportsTableProps> = ({ payrolls, onViewDetails, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payroll No</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payrolls.length > 0 ? payrolls.map((payroll) => (
            <tr key={payroll._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`${payroll.firstName} ${payroll.lastName}`}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payroll.payrollNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payroll.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payroll.month}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Kshs {payroll.grossPay.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Kshs {payroll.totalDeductions.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700">Kshs {payroll.netPay.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <Button onClick={() => onViewDetails(payroll._id)} variant="secondary" className="text-xs px-2 py-1">View</Button>
                <Button onClick={() => onEdit(payroll._id)} className="text-xs px-2 py-1">Edit</Button>
                <Button onClick={() => onDelete(payroll._id)} variant="danger" className="text-xs px-2 py-1">Delete</Button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">No payroll records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;