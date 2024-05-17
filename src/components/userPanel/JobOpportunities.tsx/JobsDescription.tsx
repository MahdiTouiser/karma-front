import React from 'react';
import KCard from '../../shared/Card';

interface JobsDescriptionProps {
    selectedJobLabel: string | null;
}

const JobsDescription: React.FC<JobsDescriptionProps> = ({ selectedJobLabel }) => {
    return (
        <KCard className='flex items-center justify-center'>
            <p>{selectedJobLabel ? selectedJobLabel : "JobsDescription"}</p>
        </KCard>
    );
};

export default JobsDescription;
