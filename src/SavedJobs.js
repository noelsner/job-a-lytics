import React from 'react';
import axios from "axios";

const SavedJobs = ({auth, savedJobs}) => {
  console.log("In SavedJobs, auth=", auth);
  console.log('saved jobs:', savedJobs);
  return (
    <div className='px-3'>
      <header>
        <div className='text-gray-500 text-xl'>Saved Jobs</div>
      </header>
      <ul>
      {
        savedJobs.map((job) => {
        return (
          <li key={job.id}>
            <div className='bg-gray-800 text-gray-600 mt-6 rounded-lg p-4'>
              <div className='flex justify-between align-middle w-full'>
                <a className='text-gray-300 text-2xl mr-10 leading-tight'>{job.title}</a>
              </div>
              <div className='text-gray-400 text-lg font-bold mt-2'>{job.company}</div>
              <div className='text-gray-400 text-lg mt-2 leading-snug'>{job.location}</div>
            </div>
          </li>
        )
        })
      }
      </ul>
    </div>
  );
};
/*
<div className='text-gray-500 text-md mt-3'>
  <span className='capitalize leading-snug'>{job.description.slice(0,100)}</span>
</div>
*/
export default SavedJobs;
