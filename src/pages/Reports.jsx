import React, { useState } from 'react';
import { 
  ChartBarIcon,
  CalendarIcon,
  DocumentChartBarIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import StatsCard from '../components/StatsCard';

const Reports = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-03-01',
    endDate: '2024-03-15'
  });

  // Mock data for reports
  const reportData = {
    daily: {
      totalInterviews: 12,
      attended: 10,
      absent: 2,
      selected: 4,
      eliminated: 6,
      byRole: {
        'Frontend Developer': { interviews: 5, selected: 2 },
        'Backend Developer': { interviews: 3, selected: 1 },
        'UI/UX Designer': { interviews: 2, selected: 1 },
        'QA Engineer': { interviews: 2, selected: 0 }
      }
    },
    weekly: {
      totalInterviews: 45,
      attended: 38,
      absent: 7,
      selected: 15,
      eliminated: 23,
      byRole: {
        'Frontend Developer': { interviews: 18, selected: 6 },
        'Backend Developer': { interviews: 12, selected: 4 },
        'UI/UX Designer': { interviews: 8, selected: 3 },
        'QA Engineer': { interviews: 7, selected: 2 }
      }
    },
    monthly: {
      totalInterviews: 180,
      attended: 165,
      absent: 15,
      selected: 45,
      eliminated: 120,
      byRole: {
        'Frontend Developer': { interviews: 72, selected: 18 },
        'Backend Developer': { interviews: 48, selected: 12 },
        'UI/UX Designer': { interviews: 36, selected: 9 },
        'QA Engineer': { interviews: 24, selected: 6 }
      }
    }
  };

  const currentData = reportData[reportType];

  const interviewerStats = [
    { name: 'Sarah Wilson', interviews: 25, selected: 8, efficiency: '32%' },
    { name: 'Mike Johnson', interviews: 20, selected: 7, efficiency: '35%' },
    { name: 'David Lee', interviews: 18, selected: 5, efficiency: '28%' },
    { name: 'Lisa Chen', interviews: 15, selected: 6, efficiency: '40%' }
  ];

  const generateReport = () => {
    // Mock report generation
    alert(`Generating ${reportType} report for ${dateRange.startDate} to ${dateRange.endDate}`);
  };

  const exportReport = () => {
    // Mock export functionality
    alert(`Exporting ${reportType} report as PDF`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <button onClick={exportReport} className="btn-primary flex items-center">
          <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
          Export PDF
        </button>
      </div>

      {/* Report Controls */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
          <div>
            <label className="label">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="input-field"
            >
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
            </select>
          </div>
          
          <div>
            <label className="label">Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="label">End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
              className="input-field"
            />
          </div>
          
          <div className="flex items-end">
            <button onClick={generateReport} className="btn-primary">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Total Interviews"
          value={currentData.totalInterviews}
          icon={CalendarIcon}
          color="blue"
        />
        <StatsCard
          title="Attended"
          value={currentData.attended}
          icon={ChartBarIcon}
          color="green"
        />
        <StatsCard
          title="Absent"
          value={currentData.absent}
          icon={DocumentChartBarIcon}
          color="yellow"
        />
        <StatsCard
          title="Selected"
          value={currentData.selected}
          icon={ChartBarIcon}
          color="emerald"
        />
        <StatsCard
          title="Eliminated"
          value={currentData.eliminated}
          icon={DocumentChartBarIcon}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role-wise Statistics */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Role-wise Interview Statistics</h3>
          <div className="space-y-4">
            {Object.entries(currentData.byRole).map(([role, stats]) => (
              <div key={role} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{role}</p>
                  <p className="text-sm text-gray-600">
                    {stats.interviews} interviews • {stats.selected} selected
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-600">
                    {Math.round((stats.selected / stats.interviews) * 100)}%
                  </p>
                  <p className="text-xs text-gray-500">Success Rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interviewer Performance */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Interviewer Performance</h3>
          <div className="space-y-4">
            {interviewerStats.map((interviewer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{interviewer.name}</p>
                  <p className="text-sm text-gray-600">
                    {interviewer.interviews} interviews • {interviewer.selected} selected
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{interviewer.efficiency}</p>
                  <p className="text-xs text-gray-500">Efficiency</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interview Trends Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Interview Trends</h3>
        <div className="space-y-4">
          {/* Mock chart data */}
          {[
            { period: 'Week 1', interviews: 35, selected: 12 },
            { period: 'Week 2', interviews: 42, selected: 15 },
            { period: 'Week 3', interviews: 38, selected: 11 },
            { period: 'Week 4', interviews: 45, selected: 18 }
          ].map((data, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-16 text-sm font-medium text-gray-600">
                {data.period}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary-600 h-3 rounded-full"
                      style={{ width: `${(data.interviews / 50) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 w-8">
                    {data.interviews}
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(data.selected / 50) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 w-8">
                    {data.selected}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary-600 rounded-full mr-2"></div>
            <span>Total Interviews</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Selected Candidates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;