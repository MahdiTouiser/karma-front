import React, { useState } from 'react';
import JobsCards from './JobsCards';
import JobsDescription from './JobsDescription';

const JobOpportunities: React.FC = () => {
    const [selectedJob, setSelectedJob] = useState<any | null>(null);

    return (
        <div className='flex w-full p-40'>
            <div className='w-1/3 ml-4'>
                <JobsCards setSelectedJob={setSelectedJob} />
            </div>
            {selectedJob && (
                <div className='w-2/3'>
                    <JobsDescription jobData={selectedJob} />
                </div>
            )}
        </div>
    );
};

export default JobOpportunities;
