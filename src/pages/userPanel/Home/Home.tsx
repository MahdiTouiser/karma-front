import React from 'react';
import JobSearch from './JobSearch';
import Statistics from './Statistics';

const Home: React.FC = () => {
  return (
    <div className='flex flex-col px-48 justify-center h-screen'>
      <div>
        <Statistics />
      </div>
      <div>
        <JobSearch />
      </div>
    </div>
  );
};

export default Home;
