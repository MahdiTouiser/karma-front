import React from 'react';

const Close: React.FC<{ onClick: () => void, className?: string }> = ({ onClick, className }) => (
    <svg
        onClick={onClick}
        className={`w-4 h-4 ${className}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
        ></path>
    </svg>
);

export default Close;
