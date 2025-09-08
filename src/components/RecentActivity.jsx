import React from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  UserPlusIcon 
} from '@heroicons/react/24/outline';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'selected',
      message: 'John Doe selected for Frontend Developer position',
      time: '2 hours ago',
      icon: CheckCircleIcon,
      iconColor: 'text-green-500'
    },
    {
      id: 2,
      type: 'eliminated',
      message: 'Jane Smith eliminated from UI/UX Designer round',
      time: '3 hours ago',
      icon: XCircleIcon,
      iconColor: 'text-red-500'
    },
    {
      id: 3,
      type: 'scheduled',
      message: 'Interview scheduled for Mike Johnson - Backend Developer',
      time: '4 hours ago',
      icon: ClockIcon,
      iconColor: 'text-blue-500'
    },
    {
      id: 4,
      type: 'registered',
      message: 'New candidate registered: Sarah Wilson - QA Engineer',
      time: '5 hours ago',
      icon: UserPlusIcon,
      iconColor: 'text-purple-500'
    },
    {
      id: 5,
      type: 'selected',
      message: 'Alex Brown selected for DevOps Engineer position',
      time: '6 hours ago',
      icon: CheckCircleIcon,
      iconColor: 'text-green-500'
    }
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`p-1 rounded-full ${activity.iconColor}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
          View all activity →
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;