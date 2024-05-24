import React from 'react'
import KCard from '../../../../shared/Card'

const OtherSkills: React.FC = () => {
    return (
        <KCard>
            <h1 className="text-2xl font-extrabold">مهارت های تکمیلی</h1>
            <div className='mt-6'>

                <div className='border-b-2 mt-4'></div>
                <div className='mt-4'>
                    <button className="text-sm text-blue-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        افزودن
                    </button>
                </div>
            </div>
        </KCard>
    )
}

export default OtherSkills