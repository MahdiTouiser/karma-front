import React from 'react';
import Download from '../../../assets/icons/Download';
import Share from '../../../assets/icons/Share';
import KButton from '../../shared/Button';
import KCard from '../../shared/Card';
import KSelect from '../../shared/Select';
import Contact from './Contact';
import Languages from './Languages';
import PersonalResume from './PersonalResume';
import Samples from './Samples';
import SoftwareSkills from './SoftwareSkills';
import AboutMe from './about-me/AboutMe';
import BasicInfo from './basic-info/BasicInfo';
import CareerBackground from './career-background/CareerBackground';
import EducationalHistory from './educational-history.tsx/EducationalHistory';

const MyResume: React.FC = () => {
    return (
        <>
            <div className='px-8'>
                <KCard className='flex justify-between'>
                    <div className='flex items-center'>
                        <p className='ml-2'>نحوه نمایش رزومه به</p>
                        <span>
                            <KSelect defaultValue="jobseeker" id='How to display resume'>
                                <option value="jobseeker">خودم</option>
                                <option value="employer">کارفرما</option>
                            </KSelect>
                        </span>
                    </div>
                    <div id='actions' className='flex'>
                        <KButton className='flex ml-6 transition duration-300 ease-in-out transform hover:scale-105' color='tertiary'>
                            <Download />
                            <p className='mr-2'>دانلود رزومه</p>
                        </KButton>
                        <KButton className='flex transition duration-300 ease-in-out transform hover:scale-105' color='tertiary'>
                            <Share />
                            <p className='mr-2'>اشتراک گذاری رزومه</p>
                        </KButton>
                    </div>
                </KCard>
            </div>
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
                        <CareerBackground />
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
                        <PersonalResume />
                    </div>
                    <div className='mt-6'>
                        <Samples />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyResume;
