import React, { useState } from 'react';
import { 
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  CalendarIcon,
  DocumentTextIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const CandidatePortal = () => {
  const [candidateData] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john@email.com',
    phone: '+1234567890',
    roleApplied: 'Frontend Developer',
    applicationDate: '2024-03-10',
    status: 'In Progress',
    currentRound: 'Technical Interview',
    nextInterview: {
      date: '2024-03-16',
      time: '10:00 AM',
      round: 'Technical Interview',
      interviewer: 'Sarah Wilson',
      duration: '60 minutes',
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    rounds: [
      {
        name: 'Application Submitted',
        status: 'Completed',
        result: 'Selected',
        date: '2024-03-10',
        feedback: 'Application reviewed and shortlisted'
      },
      {
        name: 'Screening Round',
        status: 'Completed',
        result: 'Selected',
        date: '2024-03-12',
        feedback: 'Good communication skills and relevant experience'
      },
      {
        name: 'Technical Interview',
        status: 'Scheduled',
        result: 'Pending',
        date: '2024-03-16',
        feedback: 'Scheduled with technical team'
      },
      {
        name: 'HR Round',
        status: 'Pending',
        result: 'Pending',
        date: null,
        feedback: 'Pending technical round completion'
      },
      {
        name: 'Final Round',
        status: 'Pending',
        result: 'Pending',
        date: null,
        feedback: 'Final decision round'
      }
    ]
  });

  const [showProfile, setShowProfile] = useState(false);

  const getStatusIcon = (status, result) => {
    if (status === 'Completed' && result === 'Selected') {
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    } else if (status === 'Completed' && result === 'Eliminated') {
      return <XCircleIcon className="w-5 h-5 text-red-500" />;
    } else if (status === 'Scheduled') {
      return <ClockIcon className="w-5 h-5 text-blue-500" />;
    } else {
      return <ClockIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status, result) => {
    if (status === 'Completed' && result === 'Selected') {
      return 'bg-green-100 text-green-800';
    } else if (status === 'Completed' && result === 'Eliminated') {
      return 'bg-red-100 text-red-800';
    } else if (status === 'Scheduled') {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Application Portal</h1>
        <button 
          onClick={() => setShowProfile(!showProfile)}
          className="btn-secondary flex items-center"
        >
          <UserIcon className="w-4 h-4 mr-2" />
          {showProfile ? 'Hide Profile' : 'View Profile'}
        </button>
      </div>

      {/* Profile Section */}
      {showProfile && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">My Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <UserIcon className="w-4 h-4 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium">{candidateData.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="w-4 h-4 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{candidateData.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="w-4 h-4 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{candidateData.phone}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Role Applied</p>
                <p className="font-medium text-primary-600">{candidateData.roleApplied}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Application Date</p>
                <p className="font-medium">{candidateData.applicationDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Status</p>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {candidateData.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next Interview */}
      {candidateData.nextInterview && (
        <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center text-primary-800">
            <CalendarIcon className="w-5 h-5 mr-2" />
            Upcoming Interview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p><strong>Date:</strong> {candidateData.nextInterview.date}</p>
              <p><strong>Time:</strong> {candidateData.nextInterview.time}</p>
              <p><strong>Round:</strong> {candidateData.nextInterview.round}</p>
              <p><strong>Interviewer:</strong> {candidateData.nextInterview.interviewer}</p>
              <p><strong>Duration:</strong> {candidateData.nextInterview.duration}</p>
            </div>
            <div className="flex flex-col justify-center space-y-3">
              <button className="btn-primary">
                Join Interview
              </button>
              <button className="btn-secondary">
                Add to Calendar
              </button>
              <a 
                href={candidateData.nextInterview.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-800 text-center"
              >
                Meeting Link: {candidateData.nextInterview.meetingLink}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Application Progress */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <DocumentTextIcon className="w-5 h-5 mr-2" />
          Application Progress
        </h2>
        <div className="space-y-4">
          {candidateData.rounds.map((round, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(round.status, round.result)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{round.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(round.status, round.result)}`}>
                    {round.status === 'Completed' ? round.result : round.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{round.feedback}</p>
                {round.date && (
                  <p className="text-xs text-gray-500">
                    {round.status === 'Completed' ? 'Completed on: ' : 'Scheduled for: '}{round.date}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions & Tips */}
      <div className="card bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Interview Tips & Instructions</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Join the interview 5-10 minutes early to test your audio and video setup.</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Ensure you have a stable internet connection and a quiet environment.</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Have your resume and any relevant documents ready for reference.</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Prepare questions about the role and company to show your interest.</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>For technical interviews, be ready to share your screen and code live.</p>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="card border-l-4 border-l-primary-500">
        <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
        <p className="text-sm text-gray-600 mb-3">
          If you have any questions about your interview or need technical support, please contact our HR team.
        </p>
        <div className="flex space-x-3">
          <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
            Contact HR
          </button>
          <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
            Technical Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidatePortal;