import { PDFViewer } from '@react-pdf/renderer';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckBadge from '../../../assets/icons/CheckBadge';
import Eye from '../../../assets/icons/Eye';
import KButton from '../../shared/Button';
import KCard from '../../shared/Card';
import ResumePreview from './ResumePreview';

const FinalizeResume: React.FC = () => {
    const navigate = useNavigate();
    const [showPreview, setShowPreview] = useState(false);

    const handleButtonClick = () => {
        navigate('/my-resume');
    };

    return (
        <KCard className='m-20 flex flex-col justify-center items-center text-3xl'>
            <CheckBadge />
            <p className='font-extrabold mb-4'>تبریک !</p>
            <p>رزومه شما حاضر است!</p>
            <span className='flex items-center mt-4'>
                <button
                    className='flex items-center'
                    onClick={() => setShowPreview(true)}
                >
                    <Eye />
                    <p className='text-sm mr-2 text-blue-500'>پیش نمایش رزومه</p>
                </button>
            </span>

            <p className='text-sm mt-4'>تبریک می‌گوییم! حالا وقت آن است که در هزاران آگهی شغلی جستجو کنید و شغل متناسب با توانایی‌هایتان را پیدا کنید.</p>

            <div className='mt-4'>
                <KButton color='primary' outline={false} onClick={handleButtonClick}>
                    رزومه من
                </KButton>
            </div>

            {showPreview && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-4 rounded-lg'>
                        <button onClick={() => setShowPreview(false)} className='text-sm'>
                            بستن
                        </button>
                        <PDFViewer style={{ width: '1000px', height: '600px' }}>
                            <ResumePreview />
                        </PDFViewer>
                    </div>
                </div>
            )}
        </KCard>
    );
};

export default FinalizeResume;
