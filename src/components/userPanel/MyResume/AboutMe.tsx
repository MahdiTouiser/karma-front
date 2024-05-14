import { Avatar } from 'flowbite-react';
import React from 'react';
import KCard from '../../shared/Card';

const AboutMe: React.FC = () => {
    return (
        <KCard className='flex flex-col justify-between'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-bold'>درباره من</h1>
                <button className="text-sm text-blue-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    ویرایش
                </button>
            </div>
            <div className="flex mt-5">
                <Avatar alt='profile-photo' img='src/assets/profile-photo.jpg' rounded size='lg' />
                <div className='flex flex-col mr-5 mt-5'>
                    <p className='text-sm'><span className='font-bold'>مهدی تویسرکانی </span> <br /> Front-end developer</p>
                </div>
            </div>
            <div>
                <p className='text-gray-600 text-justify ltr mt-10'>
                    I am a highly adaptable and enthusiastic Front-End Developer with a strong passion for web development. Eager to learn, I actively seek new knowledge and stay updated with the latest trends and technologies.
                </p>
            </div>
        </KCard>
    );
}

export default AboutMe;
