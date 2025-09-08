import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CandidateRegistration from './pages/CandidateRegistration';
import InterviewScheduling from './pages/InterviewScheduling';
import CandidateTracking from './pages/CandidateTracking';
import Reports from './pages/Reports';
import InterviewerView from './pages/InterviewerView';
import CandidatePortal from './pages/CandidatePortal';

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setUserRole(userData.role);
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard userRole={userRole} />} />
            <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
            
            {/* HR/Admin Routes */}
            {(userRole === 'admin' || userRole === 'hr') && (
              <>
                <Route path="/candidate-registration" element={<CandidateRegistration />} />
                <Route path="/interview-scheduling" element={<InterviewScheduling />} />
                <Route path="/candidate-tracking" element={<CandidateTracking />} />
                <Route path="/reports" element={<Reports />} />
              </>
            )}
            
            {/* Interviewer Routes */}
            {userRole === 'interviewer' && (
              <Route path="/interviewer" element={<InterviewerView />} />
            )}
            
            {/* Candidate Routes */}
            {userRole === 'candidate' && (
              <Route path="/candidate-portal" element={<CandidatePortal />} />
            )}
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;