import React from 'react'
import KCard from '../../shared/Card'
import UserSideber from '../SignupSidebar'

const CVCreation: React.FC = () => {
    return (
        <KCard withPadding={false} className='flex justify-start m-20'>
            <UserSideber isMenuOpen={false} toggleMenu={function (): void {
                throw new Error('Function not implemented.')
            }} />
        </KCard>
    )
}

export default CVCreation