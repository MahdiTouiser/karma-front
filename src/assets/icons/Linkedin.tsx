import React from 'react';

interface LinkedinProps {
  strokeColor?: string;
  className?: string;
  size?: number;
}

const Linkedin: React.FC<LinkedinProps> = ({ strokeColor = 'none', className = 'mr-1.5', size = 24 }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill="#0077B5"
      stroke={strokeColor}
      width={size}
      height={size}
      viewBox='0 0 24 24'
      className={`${className} h-${size} w-${size}`}
    >
      <path d='M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.27V1.73C24 .77 23.21 0 22.23 0zM7.06 20.45H3.56V9h3.5v11.45zM5.31 7.5c-1.1 0-2-.9-2-2s.89-2 2-2 2 .9 2 2-.89 2-2 2zM20.45 20.45h-3.5V14.5c0-1.41-.03-3.24-1.98-3.24-1.99 0-2.3 1.55-2.3 3.14v6.05h-3.5V9h3.36v1.56h.05c.47-.89 1.61-1.82 3.32-1.82 3.55 0 4.2 2.34 4.2 5.38v6.33z' />
    </svg>
  );
}

export default Linkedin;