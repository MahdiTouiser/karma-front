import React, { useState } from 'react';
import JobsCards from './JobsCards';
import JobsDescription from './JobsDescription';

const JobOpportunities: React.FC = () => {
    const [selectedJobLabel, setSelectedJobLabel] = useState<string | null>(null);

    return (
        <div className='flex w-full p-40'>
            <div className='w-1/3 ml-4'>
                <JobsCards setSelectedJobLabel={setSelectedJobLabel} />
            </div>
            <div className='w-2/3'>
                <JobsDescription selectedJobLabel={selectedJobLabel} />
            </div>
        </div>
    );
};

export default JobOpportunities;
