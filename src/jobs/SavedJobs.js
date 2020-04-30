import React, { useState } from 'react';
import Job from './Job';
import Map from './SavedJobsMap';
import SavedJobsStats from './SavedJobsStats';

const SavedJobs = ({ savedJobs, favorites, addToFavorites, removeFromFavorites, auth, setTempJob, savedJobSet, userLocation }) => {
  const [highlight, setHighlight] = useState('')
  return (
    <div className='px-3'>
      
      { savedJobs.length ? (
        <div>
          <header>
            <div className='text-gray-300 text-xl mt-6 mx-3 font-bold'>Your Saved Jobs ({savedJobs.length})</div>
          </header>
          <div className='flex flex-row justify-between'>
            <div className='flex-1 px-3'>
              <ul>
                {
                  savedJobs.map((job) => {
                    return (
                      <Job job={job} key={job.listingId} savedJobs={savedJobs} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} auth={auth} setTempJob={setTempJob} savedJobSet={savedJobSet} highlight={highlight} />
                    )
                  })
                }
              </ul>
            </div>
            <div className='flex-1 px-3'>
              <div className='mt-6 rounded-lg overflow-auto'>
                <Map savedJobs={savedJobs} userLocation={userLocation} setHighlight={setHighlight} />
              </div>
              <SavedJobsStats savedJobs = {savedJobs}/>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className='text-gray-600 text-2xl px-3 leading-tight text-center mt-10'> You haven't saved any jobs yet. </div>
        </div>
      )}
    </div>
  );
};
export default SavedJobs;
