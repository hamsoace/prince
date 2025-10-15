
import React from 'react';
import Button from './common/Button';

interface HeaderProps {
  onLogout: () => void;
  onNavigate: (view: 'DASHBOARD' | 'REPORTS') => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onNavigate }) => {
  return (
    <header className="bg-blue-700 text-white shadow-md no-print">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold">Prince of Peace Academy Payroll</h1>
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('DASHBOARD')}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white"
            >
              Payroll Form
            </button>
            <button
              onClick={() => onNavigate('REPORTS')}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white"
            >
              Reports
            </button>
            <Button onClick={onLogout} variant="secondary">
              Logout
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
