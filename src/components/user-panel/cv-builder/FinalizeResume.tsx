import React from 'react';

import { useNavigate } from 'react-router-dom';

import CheckBadge from '../../../assets/icons/CheckBadge';
import useApi from '../../../hooks/useApi';
import KButton from '../../shared/Button';
import KCard from '../../shared/Card';

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
        <KCard className='flex flex-col items-center justify-center m-4 text-xl md:m-20 md:text-3xl'>
            <CheckBadge className='w-16 h-16 mb-4' />
            <p className='mb-4 font-extrabold'>تبریک !</p>
            <p>رزومه شما حاضر است!</p>

            <p className='px-4 mt-4 text-sm text-center'>
                تبریک می‌گوییم! حالا وقت آن است که در هزاران آگهی شغلی جستجو کنید و شغل متناسب با توانایی‌هایتان را پیدا کنید.
            </p>

            <div className='mt-4'>
                <KButton color='primary' outline={false} onClick={handleButtonClick}>
                    رزومه من
                </KButton>
            </div>

            <div className='mt-4'>
                <KButton
                    color='primary'
                    outline={false}
                    onClick={handleDownloadResume}
                    disabled={isPending}
                >
                    {isPending ? 'در حال بارگذاری...' : 'دانلود رزومه'}
                </KButton>
            </div>
        </KCard>
    );
};

export default FinalizeResume;