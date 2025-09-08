import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  ChartBarIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Navbar = ({ user, onLogout }) => {
  const getNavItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon }
    ];

    if (user.role === 'admin' || user.role === 'hr') {
      return [
        ...baseItems,
        { name: 'Candidate Registration', href: '/candidate-registration', icon: UserGroupIcon },
        { name: 'Interview Scheduling', href: '/interview-scheduling', icon: CalendarIcon },
        { name: 'Candidate Tracking', href: '/candidate-tracking', icon: ClipboardDocumentListIcon },
        { name: 'Reports', href: '/reports', icon: ChartBarIcon }
      ];
    }

    if (user.role === 'interviewer') {
      return [
        ...baseItems,
        { name: 'My Interviews', href: '/interviewer', icon: ClipboardDocumentListIcon }
      ];
    }

    if (user.role === 'candidate') {
      return [
        ...baseItems,
        { name: 'My Portal', href: '/candidate-portal', icon: UserIcon }
      ];
    }

    return baseItems;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary-600">IMS</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {getNavItems().map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Welcome, <span className="font-medium">{user.name}</span>
              <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                {user.role.toUpperCase()}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;