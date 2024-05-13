import React from 'react'
import AboutMe from './AboutMe'

const MyResume: React.FC = () => {
    return (
        <>
            <div className='flex flex-col mt-10 w-screen px-10'>
                <div className='w-3/5'>
                    <AboutMe />
                </div>
                <div>
                    
                </div>
            </div>
        </>
    )
}

export default MyResume