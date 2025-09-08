import React from 'react';
import { 
  UserGroupIcon, 
  CalendarIcon, 
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import StatsCard from '../components/StatsCard';
import InterviewChart from '../components/InterviewChart';
import RecentActivity from '../components/RecentActivity';

const Dashboard = ({ userRole }) => {
  // Mock data - in real app, this would come from API
  const stats = {
    todayInterviews: 12,
    weeklyInterviews: 45,
    monthlyInterviews: 180,
    totalCandidates: 320,
    selectedCandidates: 45,
    eliminatedCandidates: 120,
    pendingInterviews: 25
  };

  const renderHRDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">HR Dashboard</h1>
        <div className="text-sm text-gray-600">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Today's Interviews"
          value={stats.todayInterviews}
          icon={CalendarIcon}
          color="blue"
        />
        <StatsCard
          title="Weekly Interviews"
          value={stats.weeklyInterviews}
          icon={ChartBarIcon}
          color="green"
        />
        <StatsCard
          title="Total Candidates"
          value={stats.totalCandidates}
          icon={UserGroupIcon}
          color="purple"
        />
        <StatsCard
          title="Selected"
          value={stats.selectedCandidates}
          icon={CheckCircleIcon}
          color="emerald"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InterviewChart />
        <RecentActivity />
      </div>
    </div>
  );

  const renderInterviewerDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Interviewer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Today's Interviews"
          value={5}
          icon={CalendarIcon}
          color="blue"
        />
        <StatsCard
          title="Pending Reviews"
          value={3}
          icon={ClockIcon}
          color="yellow"
        />
        <StatsCard
          title="Completed"
          value={12}
          icon={CheckCircleIcon}
          color="green"
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          {[
            { time: '10:00 AM', candidate: 'John Doe', role: 'Frontend Developer', round: 'Technical' },
            { time: '11:30 AM', candidate: 'Jane Smith', role: 'UI/UX Designer', round: 'Portfolio Review' },
            { time: '2:00 PM', candidate: 'Mike Johnson', role: 'Backend Developer', round: 'System Design' }
          ].map((interview, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{interview.candidate}</p>
                <p className="text-sm text-gray-600">{interview.role} - {interview.round}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-primary-600">{interview.time}</p>
                <button className="text-sm text-primary-600 hover:text-primary-800">
                  Start Interview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCandidateDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Candidate Portal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Application Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Application Submitted</span>
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>Screening Round</span>
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>Technical Round</span>
              <ClockIcon className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>HR Round</span>
              <ClockIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Next Interview</h3>
          <div className="space-y-2">
            <p><strong>Date:</strong> Tomorrow, March 15, 2024</p>
            <p><strong>Time:</strong> 2:00 PM</p>
            <p><strong>Round:</strong> Technical Interview</p>
            <p><strong>Interviewer:</strong> John Smith</p>
            <p><strong>Duration:</strong> 60 minutes</p>
          </div>
          <button className="mt-4 btn-primary w-full">
            Join Interview
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {userRole === 'hr' || userRole === 'admin' ? renderHRDashboard() :
       userRole === 'interviewer' ? renderInterviewerDashboard() :
       renderCandidateDashboard()}
    </div>
  );
};

export default Dashboard;