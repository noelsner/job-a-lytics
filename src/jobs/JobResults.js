import React, { useEffect } from "react";
import Job from './Job';

const JobResults = ({ jobs, savedJobs, favorites, addToFavorites, removeFromFavorites, auth, setTempJob, inputQuery, inputLocation, savedJobSet, searchResults }) => {

  return (
    <div className='pl-3 pr-3 md:pr-0'>
      <header>
        <div className='text-gray-500 text-xl'>Results for "{searchResults.inputQuery}" in "{searchResults.inputLocation}":</div>
        <div className='text-gray-600 text-sm'>Showing {jobs.length} jobs.</div>
      </header>
      <ul>
        {
          jobs.map((job) => {
            return (
              <Job job={job} key={job.listingId} savedJobs={savedJobs} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} auth={auth} setTempJob={setTempJob} savedJobSet={savedJobSet} />
            )
          })
        }
      </ul>
    </div>
  );
};

export default JobResults;
