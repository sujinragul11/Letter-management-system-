import React, { useState } from 'react';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  DocumentArrowUpIcon
} from '@heroicons/react/24/outline';

const CandidateRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    skills: '',
    experience: '',
    roleApplied: 'developer',
    resume: null
  });

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@email.com',
      phone: '+1234567890',
      roleApplied: 'Frontend Developer',
      status: 'Registered',
      registeredAt: '2024-03-14'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@email.com',
      phone: '+1234567891',
      roleApplied: 'UI/UX Designer',
      status: 'Interview Scheduled',
      registeredAt: '2024-03-13'
    }
  ]);

  const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'QA Engineer',
    'DevOps Engineer',
    'Data Scientist',
    'Product Manager'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCandidate = {
      id: candidates.length + 1,
      ...formData,
      roleApplied: roles.find(role => role.toLowerCase().replace(/\s+/g, '') === formData.roleApplied) || formData.roleApplied,
      status: 'Registered',
      registeredAt: new Date().toISOString().split('T')[0]
    };
    setCandidates([...candidates, newCandidate]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      education: '',
      skills: '',
      experience: '',
      roleApplied: 'developer',
      resume: null
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData({...formData, resume: file});
    } else {
      alert('Please upload a PDF file only');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Candidate Registration</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Form */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Register New Candidate</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field pl-10"
                  placeholder="Enter full name"
                />
              </div>
            </div>

            <div>
              <label className="label">Email</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input-field pl-10"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div>
              <label className="label">Phone</label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="input-field pl-10"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div>
              <label className="label">Education</label>
              <div className="relative">
                <AcademicCapIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.education}
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                  className="input-field pl-10"
                  placeholder="e.g., B.Tech Computer Science"
                />
              </div>
            </div>

            <div>
              <label className="label">Skills</label>
              <textarea
                required
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                className="input-field"
                rows="3"
                placeholder="List relevant skills (comma separated)"
              />
            </div>

            <div>
              <label className="label">Experience</label>
              <div className="relative">
                <BriefcaseIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="input-field pl-10"
                  placeholder="e.g., 2 years in React development"
                />
              </div>
            </div>

            <div>
              <label className="label">Role Applied For</label>
              <select
                value={formData.roleApplied}
                onChange={(e) => setFormData({...formData, roleApplied: e.target.value})}
                className="input-field"
              >
                {roles.map((role) => (
                  <option key={role} value={role.toLowerCase().replace(/\s+/g, '')}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Resume (PDF only)</label>
              <div className="relative">
                <DocumentArrowUpIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="input-field pl-10"
                  required
                />
              </div>
              {formData.resume && (
                <p className="text-sm text-green-600 mt-1">
                  ✓ {formData.resume.name} selected
                </p>
              )}
            </div>

            <button type="submit" className="w-full btn-primary">
              Register Candidate
            </button>
          </form>
        </div>

        {/* Candidates List */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Recent Registrations</h2>
          <div className="space-y-3">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-gray-600">{candidate.email}</p>
                    <p className="text-sm text-gray-600">{candidate.roleApplied}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      candidate.status === 'Registered' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {candidate.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{candidate.registeredAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegistration;