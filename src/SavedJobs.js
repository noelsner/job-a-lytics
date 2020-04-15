import React from 'react';
import axios from "axios";

const SavedJobs = ({auth, savedJobs}) => {
  console.log("In SavedJobs, auth=", auth);

  return (
    <div className='px-3'>
      <header>
        <div className='text-gray-500 text-xl'>Saved Jobs</div>
      </header>
    </div>
  );
};
//<div className='p-6 text-gray-600'>{savedJobs} </div>
export default SavedJobs;
