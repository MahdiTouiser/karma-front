import React from 'react';

import { useNavigate } from 'react-router-dom';

import CheckBadge from '../../../assets/icons/CheckBadge';
import useApi from '../../../hooks/useApi';
import KButton from '../../shared/Button';
import KCard from '../../shared/Card';
import KSpinner from '../../shared/Spinner';

const FinalizeResume: React.FC = () => {
    const navigate = useNavigate();
    const { sendRequest, isPending } = useApi();

    const handleButtonClick = () => {
        navigate('/my-resume');
    };

    const handleDownloadResume = async () => {
        try {
            const response: any = await sendRequest({
                url: 'Resumes/Download',
                method: 'GET',
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        } catch (error) {
            console.error('Error downloading resume:', error);
        }
    };

    return (
        <KCard className="flex flex-col items-center justify-center p-6 m-4 text-center rounded-lg shadow-lg md:m-20 md:p-10">
            <CheckBadge className='w-16 h-16 mb-4' />
            <p className='mb-4 text-xl font-extrabold md:text-3xl'>تبریک !</p>
            <p className='text-lg md:text-2xl'>رزومه شما حاضر است!</p>

            <p className='px-4 mt-4 text-sm md:text-lg'>
                تبریک می‌گوییم! حالا وقت آن است که در هزاران آگهی شغلی جستجو کنید و شغل متناسب با توانایی‌هایتان را پیدا کنید.
            </p>

            <div className='flex justify-center w-full mt-4'>
                <KButton
                    color='primary'
                    outline={false}
                    onClick={handleDownloadResume}
                    disabled={isPending}
                    className="flex items-center justify-center"
                >
                    {isPending ? <KSpinner color='primary' /> : 'دانلود رزومه'}
                </KButton>
            </div>

            <div className='flex justify-center w-full mt-4'>
                <KButton color='primary' outline={false} onClick={handleButtonClick}>
                    رزومه من
                </KButton>
            </div>
        </KCard>
    );
};

export default FinalizeResume;