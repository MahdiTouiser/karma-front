import React from 'react';
import { Link } from 'react-router-dom';
import KButton from '../../shared/Button';
import KCard from '../../shared/Card';

const CVBuilder: React.FC = () => {
    return (
        <KCard className='flex items-center justify-center m-20 !p-36 !bg-green-500 rounded-2xl'>
            <div className='text-white'>
                <p className='text-4xl'>
                    ساخت رزومه استاندارد و حرفه‌ای
                </p>
                <p className='text-4xl'>
                    با رزومه ساز کارما
                </p>
                <div>
                    <Link to='/cv-builder/create'>
                        <KButton className='bg-white text-green-500 mt-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-green-500 hover:text-white'>
                            ساخت رزومه
                        </KButton>
                    </Link>
                </div>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text text-white mr-4 w-32 h-32">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-4-4z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            </div>
        </KCard>
    );
}

export default CVBuilder;
