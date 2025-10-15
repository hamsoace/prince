
import React, { useState } from 'react';
import Button from './common/Button';
import Input from './common/Input';
import Card from './common/Card';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Qwertytu!') {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md">
         <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-800">Prince of Peace Academy</h1>
            <p className="text-gray-600">Payroll Management System</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-center text-gray-800">Login</h2>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Input
              id="username"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
            <Input
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
