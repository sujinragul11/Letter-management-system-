import React, { useState } from 'react';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const InterviewScheduling = () => {
  const [scheduleForm, setScheduleForm] = useState({
    candidateId: '',
    interviewerId: '',
    date: '',
    time: '',
    round: 'screening',
    duration: '60',
    notes: ''
  });

  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidateName: 'John Doe',
      candidateRole: 'Frontend Developer',
      interviewer: 'Sarah Wilson',
      date: '2024-03-15',
      time: '10:00',
      round: 'Technical',
      status: 'Scheduled',
      duration: '60'
    },
    {
      id: 2,
      candidateName: 'Jane Smith',
      candidateRole: 'UI/UX Designer',
      interviewer: 'Mike Johnson',
      date: '2024-03-15',
      time: '14:00',
      round: 'Portfolio Review',
      status: 'Scheduled',
      duration: '45'
    }
  ]);

  const candidates = [
    { id: 1, name: 'John Doe', role: 'Frontend Developer' },
    { id: 2, name: 'Jane Smith', role: 'UI/UX Designer' },
    { id: 3, name: 'Mike Brown', role: 'Backend Developer' }
  ];

  const interviewers = [
    { id: 1, name: 'Sarah Wilson', expertise: 'Frontend/React' },
    { id: 2, name: 'Mike Johnson', expertise: 'UI/UX Design' },
    { id: 3, name: 'David Lee', expertise: 'Backend/Node.js' },
    { id: 4, name: 'Lisa Chen', expertise: 'Full Stack' }
  ];

  const rounds = [
    'Screening',
    'Technical',
    'System Design',
    'HR Round',
    'Final Round'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCandidate = candidates.find(c => c.id === parseInt(scheduleForm.candidateId));
    const selectedInterviewer = interviewers.find(i => i.id === parseInt(scheduleForm.interviewerId));
    
    const newInterview = {
      id: interviews.length + 1,
      candidateName: selectedCandidate?.name || '',
      candidateRole: selectedCandidate?.role || '',
      interviewer: selectedInterviewer?.name || '',
      date: scheduleForm.date,
      time: scheduleForm.time,
      round: scheduleForm.round,
      status: 'Scheduled',
      duration: scheduleForm.duration
    };

    setInterviews([...interviews, newInterview]);
    setScheduleForm({
      candidateId: '',
      interviewerId: '',
      date: '',
      time: '',
      round: 'screening',
      duration: '60',
      notes: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Interview Scheduling</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Form */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <PlusIcon className="w-5 h-5 mr-2" />
              Schedule Interview
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Candidate</label>
                <select
                  required
                  value={scheduleForm.candidateId}
                  onChange={(e) => setScheduleForm({...scheduleForm, candidateId: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select Candidate</option>
                  {candidates.map((candidate) => (
                    <option key={candidate.id} value={candidate.id}>
                      {candidate.name} - {candidate.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Interviewer</label>
                <select
                  required
                  value={scheduleForm.interviewerId}
                  onChange={(e) => setScheduleForm({...scheduleForm, interviewerId: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select Interviewer</option>
                  {interviewers.map((interviewer) => (
                    <option key={interviewer.id} value={interviewer.id}>
                      {interviewer.name} ({interviewer.expertise})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    required
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm({...scheduleForm, date: e.target.value})}
                    className="input-field pl-10"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div>
                <label className="label">Time</label>
                <div className="relative">
                  <ClockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="time"
                    required
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="label">Round</label>
                <select
                  value={scheduleForm.round}
                  onChange={(e) => setScheduleForm({...scheduleForm, round: e.target.value})}
                  className="input-field"
                >
                  {rounds.map((round) => (
                    <option key={round} value={round.toLowerCase()}>
                      {round}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Duration (minutes)</label>
                <select
                  value={scheduleForm.duration}
                  onChange={(e) => setScheduleForm({...scheduleForm, duration: e.target.value})}
                  className="input-field"
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                </select>
              </div>

              <div>
                <label className="label">Notes (Optional)</label>
                <textarea
                  value={scheduleForm.notes}
                  onChange={(e) => setScheduleForm({...scheduleForm, notes: e.target.value})}
                  className="input-field"
                  rows="3"
                  placeholder="Any special instructions or notes"
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Schedule Interview
              </button>
            </form>
          </div>
        </div>

        {/* Scheduled Interviews */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Scheduled Interviews</h2>
            <div className="space-y-4">
              {interviews.map((interview) => (
                <div key={interview.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-gray-900">{interview.candidateName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                          {interview.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{interview.candidateRole}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 mr-1" />
                          {interview.interviewer}
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {interview.date}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {interview.time} ({interview.duration}min)
                        </div>
                      </div>
                      <p className="text-sm font-medium text-primary-600 mt-1">
                        {interview.round} Round
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-sm text-primary-600 hover:text-primary-800">
                        Edit
                      </button>
                      <button className="text-sm text-red-600 hover:text-red-800">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduling;