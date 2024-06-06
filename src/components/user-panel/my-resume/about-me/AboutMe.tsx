import { Avatar } from 'flowbite-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Edit from '../../../../assets/icons/Edit';
import Linkedin from '../../../../assets/icons/Linkedin';
import KCard from '../../../shared/Card';
import AboutMeModal from './AboutMeModal';

const AboutMe: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    return (
        <KCard className='flex flex-col justify-between'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-bold'>درباره من</h1>
                <button onClick={openModal} className="text-sm text-blue-500 flex items-center">
                    <Edit strokeColor='#3b82f6' />
                    ویرایش
                </button>
            </div>
            <div className="flex justify-between mt-5">
                <div className='flex'>
                    <Avatar alt='profile-photo' rounded size='lg' />
                    <div className='flex flex-col mr-5 justify-center items-center text-center'>
                        <p className='text-sm'><span className='font-bold'>مهدی تویسرکانی</span> <br /> Front-end developer</p>
                    </div>
                </div>
                <div className='flex'>
                    <Link to={'https://github.com/MahdiTouiser'} target='_blank'>
                        <Linkedin />
                    </Link>
                </div>
            </div>
            <div>
                <p className='text-gray-600 text-justify ltr mt-10'>
                    {/* I am a highly adaptable and enthusiastic Front-End Developer with a strong passion for web development. Eager to learn, I actively seek new knowledge and stay updated with the latest trends and technologies. With expertise in HTML, CSS, and JavaScript, I create visually appealing and responsive user interfaces. I thrive in collaborative environments, working closely with designers, back-end developers, and stakeholders to exceed expectations. My adaptability enables me to quickly adapt to new challenges and technologies. I embrace continuous learning and always strive to expand my skill set to deliver exceptional web experiences. */}
                </p>
            </div>
            <AboutMeModal show={isModalOpen} onClose={closeModal} />
        </KCard>
    );
}

export default AboutMe;
