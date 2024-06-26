import React from 'react';

interface ChevronLeftProps {
    onClick: () => void;
    className?: string
}

const ChevronLeft: React.FC<ChevronLeftProps> = ({ onClick }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer w-4 h-4'
            onClick={onClick}
        >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
        </svg>
    );
};

export default ChevronLeft;
