import React from "react";

interface UploadProps {
    strokeColor?: string;
    className?: string;
}
const Upload: React.FC<UploadProps> = ({ strokeColor = '1.5', className = 'ml-2 h-4 w-4' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeColor} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
        </svg>
    )
}

export default Upload