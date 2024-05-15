import React from 'react'
import AboutMe from './AboutMe'
import BasicInfo from './BasicInfo'
import CareerHistory from './CareerHistory'
import Contact from './Contact'
import EducationalHistory from './EducationalHistory'
import Languages from './Languages'
import Samples from './Samples'
import SoftwareSkills from './SoftwareSkills'


const MyResume: React.FC = () => {
    return (
        <div className='flex py-16'>
            <div className='flex flex-col w-3/5 px-8'>
                <div>
                    <AboutMe />
                </div>
                <div className='mt-6'>
                    <BasicInfo />
                </div>
                <div className='mt-6'>
                    <EducationalHistory />
                </div>
                <div className='mt-6'>
                    <CareerHistory />
                </div>
                <div className='mt-6'>
                    <Languages />
                </div>
                <div className='mt-6'>
                    <SoftwareSkills />
                </div>
            </div>
            <div className='flex flex-col w-2/5 px-8'>
                <div>
                    <Contact />
                </div>
                <div className='mt-6'>
                    <Samples />
                </div>
            </div>
        </div>
    )
}

export default MyResume