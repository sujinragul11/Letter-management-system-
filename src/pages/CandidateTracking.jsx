import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const CandidateTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@email.com',
      phone: '+1234567890',
      roleApplied: 'Frontend Developer',
      status: 'Selected',
      currentRound: 'Final',
      registeredAt: '2024-03-10',
      lastUpdated: '2024-03-14',
      rounds: [
        { name: 'Screening', status: 'Completed', result: 'Selected', date: '2024-03-11' },
        { name: 'Technical', status: 'Completed', result: 'Selected', date: '2024-03-12' },
        { name: 'HR Round', status: 'Completed', result: 'Selected', date: '2024-03-13' },
        { name: 'Final', status: 'Completed', result: 'Selected', date: '2024-03-14' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@email.com',
      phone: '+1234567891',
      roleApplied: 'UI/UX Designer',
      status: 'In Progress',
      currentRound: 'Technical',
      registeredAt: '2024-03-12',
      lastUpdated: '2024-03-14',
      rounds: [
        { name: 'Screening', status: 'Completed', result: 'Selected', date: '2024-03-13' },
        { name: 'Portfolio Review', status: 'Scheduled', result: 'Pending', date: '2024-03-15' }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@email.com',
      phone: '+1234567892',
      roleApplied: 'Backend Developer',
      status: 'Eliminated',
      currentRound: 'Technical',
      registeredAt: '2024-03-11',
      lastUpdated: '2024-03-13',
      rounds: [
        { name: 'Screening', status: 'Completed', result: 'Selected', date: '2024-03-12' },
        { name: 'Technical', status: 'Completed', result: 'Eliminated', date: '2024-03-13' }
      ]
    }
  ]);

  const statuses = ['all', 'Registered', 'In Progress', 'Selected', 'Eliminated', 'Absent'];
  const roles = ['all', 'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'QA Engineer'];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesRole = roleFilter === 'all' || candidate.roleApplied === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Selected': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'Eliminated': return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'In Progress': return <ClockIcon className="w-5 h-5 text-blue-500" />;
      default: return <UserIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected': return 'bg-green-100 text-green-800';
      case 'Eliminated': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Registered': return 'bg-gray-100 text-gray-800';
      case 'Absent': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoundStatusColor = (result) => {
    switch (result) {
      case 'Selected': return 'text-green-600';
      case 'Eliminated': return 'text-red-600';
      case 'Pending': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Candidate Tracking</h1>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </option>
                ))}
              </select>
            </div>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="input-field"
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role === 'all' ? 'All Roles' : role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <div key={candidate.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(candidate.status)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                  <p className="text-sm text-gray-600">{candidate.email} • {candidate.phone}</p>
                  <p className="text-sm font-medium text-primary-600">{candidate.roleApplied}</p>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}>
                  {candidate.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Registered: {candidate.registeredAt}
                </p>
                <p className="text-xs text-gray-500">
                  Updated: {candidate.lastUpdated}
                </p>
              </div>
            </div>

            {/* Interview Rounds Progress */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Interview Progress</h4>
              <div className="space-y-2">
                {candidate.rounds.map((round, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        round.result === 'Selected' ? 'bg-green-500' :
                        round.result === 'Eliminated' ? 'bg-red-500' :
                        round.result === 'Pending' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-sm font-medium">{round.name}</span>
                      <span className={`text-sm ${getRoundStatusColor(round.result)}`}>
                        {round.result}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {round.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
              <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
                View Details
              </button>
              <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
                Schedule Interview
              </button>
              {candidate.status === 'Eliminated' && (
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Offer Internship
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No candidates found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default CandidateTracking;