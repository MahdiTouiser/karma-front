import React from 'react';

interface KCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  withPadding?: boolean;
}

const KCard: React.FC<KCardProps> = ({ children, className, withPadding = true, ...rest }) => {
  return (
    <div
      {...rest}
      className={`${className || ''} block ${withPadding ? 'p-6' : ''} bg-white rounded-lg shadow-md dark:bg-gray-800`}
    >
      {children}
    </div>
  );
};

export default KCard;
