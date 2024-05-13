import React from 'react';
import JobSearch from './JobSearch';
import Statistics from './Statistics';

const Home: React.FC = () => {
  return (
    <div className='px-48'>
      <div className='mt-20'>
        <Statistics />
      </div>
      <JobSearch />
    </div>
  );
};

export default Home;
