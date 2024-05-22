import { Avatar } from 'flowbite-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KCard from '../../shared/Card';
import AboutMeModal from './Modals/AboutMeModal';

const AboutMe: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    return (
        <KCard className='flex flex-col justify-between'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-bold'>درباره من</h1>
                <button onClick={openModal} className="text-sm text-blue-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    ویرایش
                </button>
            </div>
            <div className="flex justify-between mt-5">
                <div>
                    <Avatar alt='profile-photo' img='/src/assets/profile-photo.jpg' rounded size='lg' />
                    <div className='flex flex-col mr-5 mt-5'>
                        <p className='text-sm'><span className='font-bold'>مهدی تویسرکانی</span> <br /> Front-end developer</p>
                    </div>
                </div>
                <div className='flex'>
                    <Link to={'https://github.com/MahdiTouiser'} target='_blank'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#0077B5"
                            viewBox="0 0 24 24"
                            className="w-8 h-8"
                        >
                            <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.27V1.73C24 .77 23.21 0 22.23 0zM7.06 20.45H3.56V9h3.5v11.45zM5.31 7.5c-1.1 0-2-.9-2-2s.89-2 2-2 2 .9 2 2-.89 2-2 2zM20.45 20.45h-3.5V14.5c0-1.41-.03-3.24-1.98-3.24-1.99 0-2.3 1.55-2.3 3.14v6.05h-3.5V9h3.36v1.56h.05c.47-.89 1.61-1.82 3.32-1.82 3.55 0 4.2 2.34 4.2 5.38v6.33z" />
                        </svg>
                    </Link>
                </div>
            </div>
            <div>
                <p className='text-gray-600 text-justify ltr mt-10'>
                    I am a highly adaptable and enthusiastic Front-End Developer with a strong passion for web development. Eager to learn, I actively seek new knowledge and stay updated with the latest trends and technologies. With expertise in HTML, CSS, and JavaScript, I create visually appealing and responsive user interfaces. I thrive in collaborative environments, working closely with designers, back-end developers, and stakeholders to exceed expectations. My adaptability enables me to quickly adapt to new challenges and technologies. I embrace continuous learning and always strive to expand my skill set to deliver exceptional web experiences.
                </p>
            </div>
            <AboutMeModal show={isModalOpen} onClose={closeModal} />
        </KCard>
    );
}

export default AboutMe;
