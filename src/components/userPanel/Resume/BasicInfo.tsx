import React from 'react';
import KCard from '../../shared/Card';

const BasicInfo: React.FC = () => {
    const infoData = [
        { label: 'نام و نام خانوادگی', value: 'مهدی تویسرکانی' },
        { label: 'جنسیت', value: 'مرد' },
        { label: 'وضعیت تاهل', value: 'مجرد' },
        { label: 'وضعیت نظام وظیفه', value: 'معافیت تحصیلی' },
        { label: 'شهر محل سکونت', value: 'تهران' },
        { label: 'محل سکونت', value: 'شهرزیبا' },
        { label: 'تاریخ تولد', value: '1378/09/05' },
        { label: 'شماره ثابت', value: '02144122644' },
        { label: 'حقوق درخواستی', value: '35 - 25 ميليون تومان' },
        { label: 'گروه شغلی مورد علاقه', value: 'توسعه نرم افزار و برنامه نویسی' },
    ];

    return (
        <KCard className='flex flex-col justify-between w-full'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-bold'>اطلاعات اولیه</h1>
                <button className="text-sm text-blue-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    ویرایش
                </button>
            </div>
            {infoData.map((info, index) => (
                <div key={index} className='flex justify-between'>
                    <p className='text-gray-600 mt-5'>{info.label}</p>
                    <p className='font-bold text-black mt-5'>{info.value}</p>
                </div>
            ))}
        </KCard>
    );
}

export default BasicInfo;
