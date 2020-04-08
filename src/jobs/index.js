import React from "react";
import Job from './Job';

const Jobs = ({ jobs }) => {
  return (
    <div className='px-3'>
      <header>
        <div className='text-gray-500 text-xl'>Results for "{jobs[0].query}" in {jobs[0].location}.</div>
        <div className='text-gray-600 text-sm'>Showing 1-10 of {jobs[0].totalResults} jobs.</div>
      </header>
      <ul>
        {
          jobs.map((job) => {
            return (
              <Job job={job} key={job.id}/>
            )
          })
        }
      </ul>
    </div>
  );
};

export default Jobs;
