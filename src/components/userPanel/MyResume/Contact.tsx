import React from 'react';
import KCard from '../../shared/Card';

const Contact: React.FC = () => {
    const ContactData = [
        { title: 'آدرس ایمیل', value: 'mahditouiserkani78@gmail.com' },
        { title: 'شماره تماس', value: '09393502695' },
    ];

    return (
        <KCard className='flex flex-col justify-between'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-bold'>اطلاعات تماس</h1>
            </div>
            {ContactData.map((contact, index) => (
                <div key={index} className="flex items-center justify-between mr-5 mt-5 bg-gray-50 p-2 rounded-md">
                    <p className='text-sm'>
                        <span className='text-gray-600'>{contact.title}</span> <br />
                        <span className='font-extrabold'>{contact.value}</span>
                    </p>
                    <button className="text-sm text-blue-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                </div>
            ))}
        </KCard>
    )
}

export default Contact
