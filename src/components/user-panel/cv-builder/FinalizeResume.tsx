import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckBadge from '../../../assets/icons/CheckBadge';
import Eye from '../../../assets/icons/Eye';
import KButton from '../../shared/Button';
import KCard from '../../shared/Card';

const FinalizeResume: React.FC = () => {
    const navigate = useNavigate()

    const handleButtonClick = () => {
        navigate('/my-resume')
    }

    return (
        <KCard className='m-20 flex flex-col justify-center items-center text-3xl'>
            <CheckBadge />
            <p className='font-extrabold mb-4'>تبریک !</p>
            <p>رزومه شما حاضر است!</p>
            <span className='flex items-center mt-4'>
                <button
                    className='flex items-center'
                    onClick={() => { console.log('Mahdi'); }}
                >
                    <Eye />
                    <p className='text-sm mr-2' style={{ color: '#3b82f6' }}>پیش نمایش رزومه</p>
                </button>
            </span>

            <p className='text-sm mt-4'>تبریک می‌گوییم! حالا وقت آن است که در هزاران آگهی شغلی جستجو کنید و شغل متناسب با توانایی‌هایتان را پیدا کنید.</p>

            <div className='mt-4'>
                <KButton color='primary' outline={false} onClick={handleButtonClick}>
                    رزومه من
                </KButton>
            </div>
        </KCard>
    );
};

export default FinalizeResume;
