import React from 'react';
import Job from './Job';

const SavedJobs = ({ savedJobs, setSavedJobs }) => {
  return (
    <div className='px-3'>
      <header>
        <div className='text-gray-500 text-xl'>Saved Jobs</div>
      </header>
      <ul>
        {
          savedJobs.map((job) => {
            return (
              <Job job={job} key={job.id} setSavedJobs={setSavedJobs}/>
            )
          })
        }
      </ul>
    </div>
  );
};
export default SavedJobs;
