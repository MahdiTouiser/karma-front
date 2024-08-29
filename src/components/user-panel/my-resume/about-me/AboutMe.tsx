import React, {
    useEffect,
    useState,
} from 'react';

import { Avatar } from 'flowbite-react';
import { useDispatch } from 'react-redux';

import {
    faLinkedin,
    faSquareInstagram,
    faSquareXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Edit from '../../../../assets/icons/Edit';
import useApi from '../../../../hooks/useApi';
import { AboutMeData } from '../../../../models/cvbuilder.models';
import { setProfilePicture } from '../../../../store/profileSlice';
import KCard from '../../../shared/Card';
import KSpinner from '../../../shared/Spinner';
import AboutMeModal from './AboutMeModal';

const AboutMe: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [aboutMeData, setAboutMeData] = useState<AboutMeData | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const { sendRequest: fetch, isPending } = useApi<null, AboutMeData>();
    const { sendRequest: fetchImage, isPending: imageIsPending } = useApi<null, Blob>();
    const dispatch = useDispatch();

    const fetchAboutMeData = () => {
        fetch(
            {
                url: '/Resumes/AboutMe',
            },
            (response) => {
                setAboutMeData(response);
                if (response.imageId) {
                    fetchUploadedImage(response.imageId);
                }
            },
        );
    };

    const fetchUploadedImage = (id: string) => {
        fetchImage(
            {
                url: `/Files/Image/${id}`,
                responseType: 'blob'
            },
            (response) => {
                const imageURL = URL.createObjectURL(response);
                setImageSrc(imageURL);
                dispatch(setProfilePicture(imageURL));
            },
        );
    };

    useEffect(() => {
        fetchAboutMeData();
    }, []);

    return (
        <KCard className='flex flex-col justify-between'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-bold'>درباره من</h1>
                <button onClick={() => {
                    fetchAboutMeData();
                    openModal();
                }} className="flex items-center text-sm text-blue-500">
                    <Edit strokeColor='#3b82f6' />
                    ویرایش
                </button>
            </div>
            {isPending ? (
                <span className='flex items-center justify-center'>
                    <KSpinner color='primary' size={20} />
                </span>
            ) : (
                aboutMeData && (
                    <>
                        <div className="flex justify-between mt-5">
                            <div className='flex'>
                                {imageIsPending ? <KSpinner size={10} /> :
                                    <Avatar alt='profile-photo' img={imageSrc || ''} rounded size='lg' />
                                }
                                <div className='flex flex-col items-center justify-center mr-5 text-center'>
                                    <p className='text-sm'><span className='font-bold'></span> <br /> {aboutMeData.mainJobTitle}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {aboutMeData.socialMedias.map((socialMedia, index) =>
                                    socialMedia.link ? (
                                        <a
                                            key={index}
                                            href={socialMedia.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-2"
                                        >
                                            {socialMedia.type === "LinkedIn" && (
                                                <FontAwesomeIcon
                                                    icon={faLinkedin}
                                                    className="w-10 h-10"
                                                    style={{ color: '#0077b5' }}
                                                />
                                            )}
                                            {socialMedia.type === "X" && (
                                                <FontAwesomeIcon
                                                    icon={faSquareXTwitter}
                                                    className="w-10 h-10"
                                                />
                                            )}
                                            {socialMedia.type === "Instagram" && (
                                                <FontAwesomeIcon
                                                    icon={faSquareInstagram}
                                                    className="w-10 h-10"
                                                    style={{ color: '#C13584' }}
                                                />
                                            )}

                                        </a>
                                    ) : null
                                )}
                            </div>
                        </div>
                        <div>
                            <p className='mt-10 text-justify text-gray-600 rtl'>
                                {aboutMeData.description}
                            </p>
                        </div>
                    </>
                )
            )}
            <AboutMeModal show={isModalOpen} onClose={closeModal} aboutMeData={aboutMeData} onSubmitSuccess={fetchAboutMeData} imageSrc={imageSrc} />
        </KCard>
    );
}

export default AboutMe;
