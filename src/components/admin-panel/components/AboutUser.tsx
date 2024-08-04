import React from 'react';

import { Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';

import Instagram from '../../../assets/icons/Instagram';
import Linkedin from '../../../assets/icons/Linkedin';
import XIcon from '../../../assets/icons/XIcon';
import KCard from '../../shared/Card';

interface AboutUserProps {
    mainJobTitle: string;
    description: string;
    socialMedias: Array<{ type: string; link: string }>;
    imageSrc: string | null;
}

const AboutUser: React.FC<AboutUserProps> = ({ mainJobTitle, description, socialMedias, imageSrc }) => {
    return (
        <KCard className='flex flex-col justify-between'>
            <div className="flex justify-between mt-5">
                <div className='flex'>
                    <Avatar alt='profile-photo' img={imageSrc || ''} rounded size='lg' />
                    <div className='flex flex-col mr-5 justify-center items-center text-center'>
                        <p className='text-sm'><span className='font-bold'>{mainJobTitle}</span></p>
                    </div>
                </div>
                <div className="flex items-center">
                    {socialMedias.map((socialMedia, index) =>
                        socialMedia.link ? (
                            <Link key={index} to={socialMedia.link} target="_blank" className="ml-2">
                                {socialMedia.type === "LinkedIn" && <Linkedin className="w-8 h-8" />}
                                {socialMedia.type === "X" && <XIcon className="w-10 h-10" />}
                                {socialMedia.type === "Instagram" && <Instagram className="w-8 h-8" />}
                            </Link>
                        ) : null
                    )}
                </div>
            </div>
            <div>
                <p className='text-gray-600 text-justify rtl mt-10'>
                    {description}
                </p>
            </div>
        </KCard>
    );
}

export default AboutUser;