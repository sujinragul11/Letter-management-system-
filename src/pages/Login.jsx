import React, { useState } from 'react';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'hr'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication - in real app, this would call an API
    const userData = {
      id: 1,
      name: credentials.role === 'hr' ? 'HR Manager' : 
            credentials.role === 'interviewer' ? 'John Interviewer' : 
            'Jane Candidate',
      email: credentials.email,
      role: credentials.role
    };
    onLogin(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Interview Management System
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        
        <form className="mt-8 space-y-6 card" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="label">Role</label>
              <select
                value={credentials.role}
                onChange={(e) => setCredentials({...credentials, role: e.target.value})}
                className="input-field"
              >
                <option value="hr">HR/Admin</option>
                <option value="interviewer">Interviewer</option>
                <option value="candidate">Candidate</option>
              </select>
            </div>
            
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="input-field pl-10"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full btn-primary">
            Sign In
          </button>
          
          <div className="text-center text-sm text-gray-600">
            <p>Demo Credentials:</p>
            <p>HR: hr@company.com / password</p>
            <p>Interviewer: interviewer@company.com / password</p>
            <p>Candidate: candidate@email.com / password</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;