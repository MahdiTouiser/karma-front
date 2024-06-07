import React from 'react';
import KButton from '../../shared/Button';
import KCard from '../../shared/Card';
import KTabs from '../../shared/Tab';

interface JobsDescriptionProps {
    jobData: {
        label: string;
        companyName: string;
        salary: string;
        date: string;
    };
}

const tabsData = [
    {
        title: 'درباره شغل',
        content: (
            <div className='mr-2'>
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
            </div>
        ),
        active: true,
    },
    {
        title: 'درباره شرکت',
        content: (
            <div className='mr-2'>
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
                خیلی این شرکت فوق العاده است
            </div>
        ),
    },
    {
        title: 'سایر آگهی های این شرکت',
        content: (
            <div className='mr-2'>
                This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
                Clicking another tab will toggle the visibility of this one for the next.dasdsadasdsadsadsadsd
            </div>
        ),
    },
    {
        title: 'سوابق ارسال رزومه',
        content: (
            <div className='mr-2'>
                This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
                Clicking another tab will toggle the visibility of this one for the next.dasdsadasdsadsadsadsd
            </div>
        ),
    },
];

const JobsDescription: React.FC<JobsDescriptionProps> = ({ jobData }) => {
    return (
        <KCard className=''>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='font-bold text-xl'>{jobData.label}</p>
                    <p className='mt-2 text-sm'>{jobData.companyName}</p>

                    <div className='flex mt-2'>
                        <p className='ml-2'>{jobData.date}</p> / <p className='mr-2'>{jobData.salary}</p>
                    </div>
                </div>
                <div>
                    <KButton color='primary'>
                        ارسال رزومه
                    </KButton>
                </div>
            </div>
            <div className='bg-gray-200 flex items-center justify-between mt-4 p-4'>
                <div className='flex'>
                    <span className='ml-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </span>
                    <p className='font-extrabold'>100 - 51 نفر</p>
                </div>
                <div className='flex'>
                    <span className='ml-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                        </svg>
                    </span>
                    <p className='font-extrabold'>برنامه نویسی </p>
                </div>
            </div>

            <div className='flex item-center justify-between border-2 rounded-md  mt-2'>
                <KTabs tabs={tabsData} />
            </div>
        </KCard>
    );
};

export default JobsDescription;
