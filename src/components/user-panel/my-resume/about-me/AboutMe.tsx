import { Avatar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Edit from '../../../../assets/icons/Edit';
import Linkedin from '../../../../assets/icons/Linkedin';
import useApi from '../../../../hooks/useApi';
import { AboutMeData } from '../../../../models/cvbuilder.models';
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
                console.log(response);
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
                }} className="text-sm text-blue-500 flex items-center">
                    <Edit strokeColor='#3b82f6' />
                    ویرایش
                </button>
            </div>
            {isPending ? (
                <span className='flex justify-center items-center'>
                    <KSpinner color='primary' size={20} />
                </span>
            ) : (
                aboutMeData && (
                    <>
                        <div className="flex justify-between mt-5">
                            <div className='flex'>
                                <Avatar alt='profile-photo' img={imageSrc || ''} rounded size='lg' />
                                <div className='flex flex-col mr-5 justify-center items-center text-center'>
                                    <p className='text-sm'><span className='font-bold'>مهدی تویسرکانی</span> <br /> {aboutMeData.mainJobTitle}</p>
                                </div>
                            </div>
                            <div className='flex'>
                                {aboutMeData.socialMedias.map((socialMedia, index) => (
                                    <Link key={index} to={socialMedia.link} target='_blank'>
                                        <Linkedin />
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className='text-gray-600 text-justify rtl mt-10'>
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
