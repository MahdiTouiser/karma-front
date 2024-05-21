import React from 'react';

interface CircularProgressProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    circleColor?: string;
    progressColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    progress,
    size = 100,
    strokeWidth = 10,
    circleColor = '#e6e6e6',
    progressColor = '#10B981'
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg
            width={size}
            height={size}
            className="block mx-auto"
        >
            <circle
                className="text-gray-300"
                stroke={circleColor}
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                className="text-green-600"
                stroke={progressColor}
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 0.35s' }}
                strokeLinecap="round"
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                className="text-gray-700 text-xl"
            >
                {`${progress}%`}
            </text>
        </svg>
    );
};

export default CircularProgress;
