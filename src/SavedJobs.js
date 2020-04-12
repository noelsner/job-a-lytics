import React from 'react';

const SavedJobs = ({auth, savedJobs}) => {

  return (
    <div className='p-6 text-gray-400'> {savedJobs} </div>
  );
};

export default SavedJobs;
