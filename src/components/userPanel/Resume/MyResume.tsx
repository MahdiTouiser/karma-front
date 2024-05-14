import React from 'react'
import AboutMe from './AboutMe'
import BasicInfo from './BasicInfo'

const MyResume: React.FC = () => {
    return (
        <>
            <div className='flex flex-col mt-10 w-screen px-10'>
                <div className='w-3/5'>
                    <AboutMe />
                </div>
                <div className='w-3/5 mt-10 flex justify-center items-center'>
                    <BasicInfo />
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default MyResume