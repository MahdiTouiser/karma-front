import React from 'react';

interface StatusIndicatorProps {
  isActive: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isActive }) => {
  const getStatusClass = () => {
    if (isActive) {
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    } else {
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  const getStatusText = () => {
    return isActive ? 'فعال' : 'غیر فعال';
  };

  return (
    <ul
      role="list"
      className={`max-w-sm divide-y divide-gray-200 dark:divide-gray-700 ${getStatusClass()}`}
    >
      <li className="py-2">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center text-xs font-medium mr-2 px-3 py-1 rounded-full">
            <span
              className={`w-3 h-3 mr-1 rounded-full ml-2 ${
                isActive ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></span>
            {getStatusText()}
          </span>
        </div>
      </li>
    </ul>
  );
};

export default StatusIndicator;
