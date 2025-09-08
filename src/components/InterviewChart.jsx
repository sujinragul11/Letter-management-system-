import React from 'react';

const InterviewChart = () => {
  // Mock data for the chart
  const weeklyData = [
    { day: 'Mon', interviews: 8, selected: 3 },
    { day: 'Tue', interviews: 12, selected: 5 },
    { day: 'Wed', interviews: 10, selected: 4 },
    { day: 'Thu', interviews: 15, selected: 6 },
    { day: 'Fri', interviews: 9, selected: 2 },
    { day: 'Sat', interviews: 5, selected: 2 },
    { day: 'Sun', interviews: 3, selected: 1 }
  ];

  const maxValue = Math.max(...weeklyData.map(d => d.interviews));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Weekly Interview Trends</h3>
      <div className="space-y-4">
        {weeklyData.map((data, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-8 text-sm font-medium text-gray-600">
              {data.day}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(data.interviews / maxValue) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 w-12">
                  {data.interviews}
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex-1 bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-green-500 h-1 rounded-full"
                    style={{ width: `${(data.selected / maxValue) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 w-12">
                  {data.selected} sel
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
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export default InterviewChart;