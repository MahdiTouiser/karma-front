import React, {
    useEffect,
    useState,
} from 'react';

import { useParams } from 'react-router-dom';

import useApi from '../../../hooks/useApi';
import KSpinner from '../../shared/Spinner';
import AboutUser from '../components/AboutUser';
import UserCareerBackground from '../components/UserCareerRecords';
import UserEducationalHistory from '../components/UserEducationalHistory';
import UserLanguages from '../components/UserLanguage';
import UserSamples from '../components/UserSamples';
import UserSoftwareSkills from '../components/UserSoftwareSkills';

const UserResumes: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const { sendRequest } = useApi();
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const checkUserExistence = async () => {
            sendRequest(
                {
                    url: `/Resumes/UserResume/${id}`,
                },
                (response: any) => {
                    console.log(response);
                    setUserData(response);
                },
                (error) => {
                    console.error("Error:", error);
                }
            );
        };

        if (id) {
            checkUserExistence();
        }
    }, [id, sendRequest]);

    if (!userData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <KSpinner color='blue' size={20} />
            </div>
        );
    }

    return (
        <div className='py-16'>
            <h1 className='text-2xl md:text-3xl font-extrabold text-center mb-8'>
                نمای کلی رزومه کاربر
            </h1>

            <div className='flex flex-col md:flex-row'>
                <div className='flex flex-col w-full md:w-3/5 px-4 md:px-8'>
                    <div>
                        <AboutUser
                            mainJobTitle={userData.mainJobTitle}
                            description={userData.description || ''}
                            socialMedias={userData.socialMedias}
                            imageSrc={userData.imageSrc || null}
                        />
                    </div>
                    <div className='mt-6'>
                        <UserEducationalHistory educationalData={userData.educationalRecords} />
                    </div>
                    <div className='mt-6'>
                        <UserCareerBackground careerRecords={userData.careerRecords} />
                    </div>
                    <div className='mt-6'>
                        <UserLanguages languages={userData.languages} />
                    </div>
                    <div className='mt-6'>
                        <UserSoftwareSkills softwareSkills={userData.softwareSkills} />
                    </div>
                </div>
                <div className='flex flex-col w-full md:w-2/5 px-4 md:px-8 mt-6 md:mt-0'>
                    <div>
                        <UserSamples workSamples={userData.workSamples} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserResumes;