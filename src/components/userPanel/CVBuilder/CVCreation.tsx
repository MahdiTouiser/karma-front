import React from 'react'
import KCard from '../../shared/Card'
import SignupSidebar from '../SignupSidebar'

const CVCreation: React.FC = () => {
    return (
        <>
            <KCard withPadding={false} className='flex justify-start my-10'>
                <SignupSidebar />
            </KCard>
        </>
    )
}

export default CVCreation