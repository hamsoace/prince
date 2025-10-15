import React from 'react';
import { type Payroll, type Earnings, type Deductions } from '../types';
import Button from './common/Button';

interface ReportDetailPageProps {
  payroll: Payroll;
  onBack: () => void;
}

const DetailRow: React.FC<{ label: string; value: string | number; className?: string }> = ({ label, value, className = '' }) => (
    <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className={`text-sm font-semibold text-gray-800 ${className}`}>{typeof value === 'number' ? `Kshs ${value.toFixed(2)}` : value}</span>
    </div>
);

const Section: React.FC<{ title: string; data: Earnings | Deductions }> = ({ title, data }) => (
    <div>
        <h4 className="text-md font-bold text-blue-800 mt-4 mb-2">{title}</h4>
        {Object.entries(data).map(([key, value]) => (
            <DetailRow key={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} value={value} />
        ))}
    </div>
);

const ReportDetailPage: React.FC<ReportDetailPageProps> = ({ payroll, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 no-print">
        <Button onClick={onBack} variant="secondary">
          &larr; Back to Reports
        </Button>
        <Button onClick={handlePrint}>
          Print Report
        </Button>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg p-8 print-container">
        <header className="text-center border-b-2 border-blue-600 pb-4 mb-6">
          <h1 className="text-3xl font-extrabold text-blue-800">Prince of Peace Academy</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mt-1">Payslip</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-6">
          <DetailRow label="Employee Name" value={`${payroll.firstName} ${payroll.lastName}`} />
          <DetailRow label="Payroll Number" value={payroll.payrollNumber} />
          <DetailRow label="Pay Period" value={`${payroll.month}, ${new Date(payroll.date).getFullYear()}`} />
          <DetailRow label="Pay Date" value={payroll.date} />
          <DetailRow label="PIN No." value={payroll.pinNo} />
          <DetailRow label="NSSF No." value={payroll.nssfNo} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            <Section title="Earnings" data={payroll.earnings} />
            <Section title="Deductions" data={payroll.deductions} />
        </div>

        <div className="mt-6 border-t-2 border-gray-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-md text-center">
                    <p className="text-sm font-medium text-green-800">Gross Pay</p>
                    <p className="text-xl font-bold text-green-700">Kshs {payroll.grossPay.toFixed(2)}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-md text-center">
                    <p className="text-sm font-medium text-red-800">Total Deductions</p>
                    <p className="text-xl font-bold text-red-700">Kshs {payroll.totalDeductions.toFixed(2)}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-md text-center border-2 border-blue-600">
                    <p className="text-lg font-bold text-blue-900">Net Pay</p>
                    <p className="text-3xl font-extrabold text-blue-800">Kshs {payroll.netPay.toFixed(2)}</p>
                </div>
            </div>
        </div>

        <footer className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-end">
          <div>
            <p className="text-sm font-medium text-gray-700">Employee Signature</p>
            <img src={payroll.signature} alt="Signature" className="h-16 w-48 border-b border-gray-400 object-contain" />
          </div>
          <p className="text-lg font-bold">{payroll.initials}</p>
        </footer>
      </div>
    </div>
  );
};

export default ReportDetailPage;