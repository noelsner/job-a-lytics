import React from "react";
import Job from './Job';

const JobResults = ({ jobs, savedJobs, favorites, addToFavorites, removeFromFavorites, auth, setTempJob }) => {
  return (
    <div className='pl-3 pr-3 md:pr-0'>
      <header>
        <div className='text-gray-500 text-xl'>Results for "{jobs[0].query}" in {jobs[0].location}.</div>
        <div className='text-gray-600 text-sm'>Showing 1-10 of {jobs[0].totalResults} jobs.</div>
      </header>
      <ul>
        {
          jobs.map((job) => {
            return (
              <Job job={job} key={job.listingId} savedJobs={savedJobs} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} auth={auth} setTempJob={setTempJob} />
            )
          })
        }
      </ul>
    </div>
  );
};

export default JobResults;
