
import React, { useState, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import DashboardPage from './components/DashboardPage';
import ReportsPage from './components/ReportsPage';
import ReportDetailPage from './components/ReportDetailPage';
import { usePayroll } from './hooks/usePayroll';
import { type Payroll } from './types';

type View = 'DASHBOARD' | 'REPORTS' | 'REPORT_DETAIL' | 'EDIT_PAYROLL';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<View>('DASHBOARD');
  const [selectedPayroll, setSelectedPayroll] = useState<Payroll | null>(null);

  const {
    payrolls,
    addPayroll,
    updatePayroll,
    deletePayroll,
    getPayrollById,
  } = usePayroll();

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    setCurrentView('DASHBOARD');
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const navigate = useCallback((view: View) => {
    setCurrentView(view);
  }, []);
  
  const handleViewDetails = useCallback((id: string) => {
      const payroll = getPayrollById(id);
      if (payroll) {
          setSelectedPayroll(payroll);
          setCurrentView('REPORT_DETAIL');
      }
  }, [getPayrollById]);

  const handleEdit = useCallback((id: string) => {
      const payroll = getPayrollById(id);
      if (payroll) {
          setSelectedPayroll(payroll);
          setCurrentView('EDIT_PAYROLL');
      }
  }, [getPayrollById]);

  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <DashboardPage onPayrollAdded={() => setCurrentView('REPORTS')} addPayroll={addPayroll} />;
      case 'EDIT_PAYROLL':
        return selectedPayroll ? <DashboardPage onPayrollUpdated={() => setCurrentView('REPORTS')} payrollToEdit={selectedPayroll} updatePayroll={updatePayroll} /> : <ReportsPage payrolls={payrolls} onNavigate={navigate} onViewDetails={handleViewDetails} onEdit={handleEdit} onDelete={deletePayroll} />;
      case 'REPORTS':
        return <ReportsPage payrolls={payrolls} onNavigate={navigate} onViewDetails={handleViewDetails} onEdit={handleEdit} onDelete={deletePayroll} />;
      case 'REPORT_DETAIL':
        return selectedPayroll ? <ReportDetailPage payroll={selectedPayroll} onBack={() => setCurrentView('REPORTS')} /> : <p>Payroll not found.</p>;
      default:
        return <DashboardPage onPayrollAdded={() => setCurrentView('REPORTS')} addPayroll={addPayroll} />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header onLogout={handleLogout} onNavigate={navigate} />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
