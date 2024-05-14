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
            <div className='flex flex-col mt-10 w-screen pr-16'>
                <div className='w-3/5'>
                    <AboutMe />
                </div>
                <div className='w-3/5 mt-6 flex justify-center items-center'>
                    <BasicInfo />
                </div>
                <div className='w-3/5 mt-6 flex justify-center items-center'>
                    <EducationalHistory />
                </div>
                <div className='w-3/5 mt-6 flex justify-center items-center'>
                    <CareerHistory />
                </div>
                <div className='w-3/5 mt-6 flex justify-center items-center'>
                    <Languages />
                </div>
                <div className='w-3/5 mt-6 flex justify-center items-center'>
                    <SoftwareSkills />
                </div>
            </div>
        </>
    )
}

export default MyResume