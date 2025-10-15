import { type Payroll, type Earnings, type Deductions } from './types';

export const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const DEFAULT_DEDUCTIONS: Deductions = {
  paye: 0,
  nssf: 300,
  sha: 200,
  housingLevy: 150,
  advances: 1000,
  loanRepayments: 1000,
  saccos: 1000,
};

export const INITIAL_EARNINGS: Earnings = {
    basicPay: 0,
    overtime: 0,
    houseAllowance: 0,
    travelAllowance: 0,
    bonus: 0,
};

export const INITIAL_PAYROLL_STATE: Omit<Payroll, 'id' | 'grossPay' | 'totalDeductions' | 'netPay'> = {
    firstName: '',
    lastName: '',
    date: new Date().toISOString().split('T')[0],
    payrollNumber: '',
    month: MONTHS[new Date().getMonth()],
    pinNo: '',
    nssfNo: '',
    shaNo: '',
    earnings: INITIAL_EARNINGS,
    deductions: DEFAULT_DEDUCTIONS,
    signature: '',
    initials: '',
};

export const MOCK_PAYROLLS: Payroll[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        date: '2024-07-28',
        payrollNumber: 'POP001',
        month: 'July',
        pinNo: 'A123456789Z',
        nssfNo: 'NSSF001',
        shaNo: 'SHA001',
        earnings: { basicPay: 50000, overtime: 5000, houseAllowance: 15000, travelAllowance: 2000, bonus: 1000 },
        deductions: { paye: 7500, nssf: 300, sha: 200, housingLevy: 150, advances: 1000, loanRepayments: 1000, saccos: 1000 },
        grossPay: 73000,
        totalDeductions: 11150,
        netPay: 61850,
        signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9mQAAAABJRU5ErkJggg==',
        initials: 'JD'
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        date: '2024-07-28',
        payrollNumber: 'POP002',
        month: 'July',
        pinNo: 'B987654321Y',
        nssfNo: 'NSSF002',
        shaNo: 'SHA002',
        earnings: { basicPay: 60000, overtime: 2000, houseAllowance: 18000, travelAllowance: 2500, bonus: 0 },
        deductions: { paye: 9000, nssf: 300, sha: 200, housingLevy: 150, advances: 1000, loanRepayments: 1000, saccos: 1000 },
        grossPay: 82500,
        totalDeductions: 12650,
        netPay: 69850,
        signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9mQAAAABJRU5ErkJggg==',
        initials: 'JS'
    }
];
