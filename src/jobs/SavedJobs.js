import React from 'react';
import Job from './Job';
import Map from './SavedJobsMap';

const SavedJobs = ({ savedJobs, favorites, addToFavorites, removeFromFavorites, auth, setTempJob, savedJobSet, userLocation }) => {
  console.log('savedJobs :>> ', savedJobs);
  return (
    <div className='px-3'>
      { savedJobs.length ? (
        <div>
          <header>
            <div className='text-gray-300 text-xl mt-6'>Your Saved Jobs ({savedJobs.length})</div>
          </header>
          <ul>
            {
              savedJobs.map((job) => {
                return (
                  <Job job={job} key={job.listingId} savedJobs={savedJobs} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} auth={auth} setTempJob={setTempJob} savedJobSet={savedJobSet} />
                )
              })
            }
          </ul>
          <Map savedJobs={savedJobs} userLocation={userLocation} />
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
