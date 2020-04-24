import React from 'react';
import Job from './Job';

const SavedJobs = ({ savedJobs, favorites, addToFavorites, removeFromFavorites, auth, setTempJob, savedJobSet }) => {
  console.log('savedJobs :>> ', savedJobs);
  return (
    <div className='px-3'>
      { savedJobs.length ? (
        <div>
          <header>
            <div className='text-gray-500 text-xl'>Saved Jobs</div>
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
