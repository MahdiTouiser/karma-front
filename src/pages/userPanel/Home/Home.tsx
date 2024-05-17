import React from 'react';
import Footer from './Footer';
import JobSearch from './JobSearch';
import Statistics from './Statistics';

const Home: React.FC = () => {
  return (
    <>
      <div className='flex flex-col px-48 justify-center h-screen'>
        <div>
          <Statistics />
        </div>
        <div>
          <JobSearch />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
