import React from 'react'
import Add from '../../../../../assets/icons/Add'
import KCard from '../../../../shared/Card'

const OtherSkills: React.FC = () => {
    return (
        <KCard>
            <h1 className="text-2xl font-extrabold">مهارت های تکمیلی</h1>
            <div className='mt-6'>

                <div className='border-b-2 mt-4'></div>
                <div className='mt-4'>
                    <button className="text-sm text-blue-500 flex items-center">
                        <Add />
                        افزودن
                    </button>
                </div>
            </div>
        </KCard>
    )
}

export default OtherSkills