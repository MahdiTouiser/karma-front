import React from 'react'
import AboutMe from './AboutMe'
import BasicInfo from './BasicInfo'
import CareerHistory from './CareerHistory'
import EducationalHistory from './EducationalHistory'
import Languages from './Languages'
import SoftwareSkills from './SoftwareSkills'


const MyResume: React.FC = () => {
    return (
        <>
            <div className='flex flex-col mt-10 w-screen p-16'>
                <div className='flex'>
                    <div className='w-3/5'>
                        <AboutMe />
                    </div>
                    <div className='w-2/5 pr-10'>
                        <AboutMe />
                    </div>
                </div>
                <div className='w-3/5 mt-6'>
                    <BasicInfo />
                </div>
                <div className='w-3/5 mt-6'>
                    <EducationalHistory />
                </div>
                <div className='w-3/5 mt-6'>
                    <CareerHistory />
                </div>
                <div className='w-3/5 mt-6'>
                    <Languages />
                </div>
                <div className='w-3/5 mt-6'>
                    <SoftwareSkills />
                </div>
            </div>
        </>
    )
}

export default MyResume