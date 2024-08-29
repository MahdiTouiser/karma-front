import React from 'react';

import { Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';

import {
  faInstagram,
  faLinkedin,
  faSquareXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    <div className='flex flex-col items-center justify-center mr-5 text-center'>
                        <p className='text-sm'><span className='font-bold'>{mainJobTitle}</span></p>
                    </div>
                </div>
                <div className="flex items-center">
                    {socialMedias.map((socialMedia, index) =>
                        socialMedia.link ? (
                            <Link key={index} to={socialMedia.link} target="_blank" className="ml-2">
                                {socialMedia.type === "LinkedIn" && <FontAwesomeIcon icon={faLinkedin} className="w-8 h-8" />}
                                {socialMedia.type === "X" && <FontAwesomeIcon icon={faSquareXTwitter} className="w-8 h-8" />}
                                {socialMedia.type === "Instagram" && <FontAwesomeIcon icon={faInstagram} className="w-8 h-8" />}
                            </Link>
                        ) : null
                    )}
                </div>
            </div>
            <div>
                <p className='mt-10 text-justify text-gray-600 rtl'>
                    {description}
                </p>
            </div>
        </KCard>
    );
}

export default AboutUser;
