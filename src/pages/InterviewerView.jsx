import React, { useState } from 'react';
import { 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const InterviewerView = () => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [feedback, setFeedback] = useState({
    technicalSkills: '',
    communication: '',
    problemSolving: '',
    overallRating: 5,
    decision: '',
    comments: ''
  });

  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidateName: 'John Doe',
      candidateEmail: 'john@email.com',
      roleApplied: 'Frontend Developer',
      round: 'Technical',
      scheduledTime: '10:00 AM',
      date: '2024-03-15',
      duration: '60 min',
      status: 'Scheduled',
      candidateDetails: {
        experience: '3 years React development',
        skills: 'React, JavaScript, TypeScript, CSS',
        education: 'B.Tech Computer Science'
      }
    },
    {
      id: 2,
      candidateName: 'Jane Smith',
      candidateEmail: 'jane@email.com',
      roleApplied: 'UI/UX Designer',
      round: 'Portfolio Review',
      scheduledTime: '2:00 PM',
      date: '2024-03-15',
      duration: '45 min',
      status: 'Scheduled',
      candidateDetails: {
        experience: '2 years UI/UX design',
        skills: 'Figma, Adobe XD, Sketch, Prototyping',
        education: 'B.Des Visual Communication'
      }
    },
    {
      id: 3,
      candidateName: 'Mike Johnson',
      candidateEmail: 'mike@email.com',
      roleApplied: 'Backend Developer',
      round: 'System Design',
      scheduledTime: '4:00 PM',
      date: '2024-03-14',
      duration: '90 min',
      status: 'Completed',
      candidateDetails: {
        experience: '4 years Node.js development',
        skills: 'Node.js, MongoDB, AWS, Docker',
        education: 'M.Tech Software Engineering'
      }
    }
  ]);

  const handleStartInterview = (interview) => {
    setSelectedInterview(interview);
    // Update interview status to 'In Progress'
    setInterviews(interviews.map(i => 
      i.id === interview.id ? { ...i, status: 'In Progress' } : i
    ));
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    
    // Update interview status based on decision
    setInterviews(interviews.map(i => 
      i.id === selectedInterview.id 
        ? { ...i, status: feedback.decision === 'selected' ? 'Selected' : 'Eliminated' }
        : i
    ));

    // Reset form and close modal
    setFeedback({
      technicalSkills: '',
      communication: '',
      problemSolving: '',
      overallRating: 5,
      decision: '',
      comments: ''
    });
    setSelectedInterview(null);
    
    alert(`Feedback submitted for ${selectedInterview.candidateName}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Selected': return 'bg-green-100 text-green-800';
      case 'Eliminated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todayInterviews = interviews.filter(i => i.date === '2024-03-15');
  const completedInterviews = interviews.filter(i => i.status === 'Completed' || i.status === 'Selected' || i.status === 'Eliminated');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Interviews</h1>
        <div className="text-sm text-gray-600">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <ClockIcon className="w-5 h-5 mr-2" />
          Today's Schedule
        </h2>
        <div className="space-y-4">
          {todayInterviews.map((interview) => (
            <div key={interview.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-gray-900">{interview.candidateName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                      {interview.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{interview.roleApplied} - {interview.round} Round</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{interview.scheduledTime}</span>
                    <span>{interview.duration}</span>
                    <span>{interview.candidateEmail}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {interview.status === 'Scheduled' && (
                    <button 
                      onClick={() => handleStartInterview(interview)}
                      className="btn-primary text-sm"
                    >
                      Start Interview
                    </button>
                  )}
                  {interview.status === 'In Progress' && (
                    <button 
                      onClick={() => setSelectedInterview(interview)}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg text-sm"
                    >
                      Submit Feedback
                    </button>
                  )}
                  <button className="btn-secondary text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Completed Interviews */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <DocumentTextIcon className="w-5 h-5 mr-2" />
          Recent Completed Interviews
        </h2>
        <div className="space-y-3">
          {completedInterviews.map((interview) => (
            <div key={interview.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{interview.candidateName}</p>
                <p className="text-sm text-gray-600">{interview.roleApplied} - {interview.round}</p>
                <p className="text-xs text-gray-500">{interview.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                  {interview.status}
                </span>
                {interview.status === 'Selected' && <CheckCircleIcon className="w-4 h-4 text-green-500" />}
                {interview.status === 'Eliminated' && <XCircleIcon className="w-4 h-4 text-red-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      {selectedInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Interview Feedback</h2>
                <button 
                  onClick={() => setSelectedInterview(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Candidate Info */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-gray-900 mb-2">{selectedInterview.candidateName}</h3>
                <p className="text-sm text-gray-600 mb-1">{selectedInterview.roleApplied} - {selectedInterview.round} Round</p>
                <div className="text-sm text-gray-500">
                  <p><strong>Experience:</strong> {selectedInterview.candidateDetails.experience}</p>
                  <p><strong>Skills:</strong> {selectedInterview.candidateDetails.skills}</p>
                  <p><strong>Education:</strong> {selectedInterview.candidateDetails.education}</p>
                </div>
              </div>

              {/* Feedback Form */}
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div>
                  <label className="label">Technical Skills (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={feedback.technicalSkills}
                    onChange={(e) => setFeedback({...feedback, technicalSkills: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Communication (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={feedback.communication}
                    onChange={(e) => setFeedback({...feedback, communication: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Problem Solving (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={feedback.problemSolving}
                    onChange={(e) => setFeedback({...feedback, problemSolving: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Overall Rating (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={feedback.overallRating}
                    onChange={(e) => setFeedback({...feedback, overallRating: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Decision</label>
                  <select
                    required
                    value={feedback.decision}
                    onChange={(e) => setFeedback({...feedback, decision: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select Decision</option>
                    <option value="selected">Selected - Move to Next Round</option>
                    <option value="eliminated">Eliminated</option>
                  </select>
                </div>

                <div>
                  <label className="label">Additional Comments</label>
                  <textarea
                    value={feedback.comments}
                    onChange={(e) => setFeedback({...feedback, comments: e.target.value})}
                    className="input-field"
                    rows="4"
                    placeholder="Detailed feedback about the candidate's performance..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button type="submit" className="btn-primary flex-1">
                    Submit Feedback
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSelectedInterview(null)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewerView;