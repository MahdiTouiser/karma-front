import React from 'react'
import KCard from '../../shared/Card'
import JobsCards from '../JobOpportunities.tsx/JobsCards'

const SavedJobs: React.FC = () => {
    return (
        <KCard className='flex justify-center'>
            <JobsCards setSelectedJob={function (_job: { label: string; companyName: string; salary: string; date: string }): void {
                throw new Error('Function not implemented.')
            }} />
        </KCard>
    )
}

export default SavedJobs