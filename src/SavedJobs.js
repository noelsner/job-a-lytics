import React from 'react';
import axios from "axios";

const SavedJobs = async ({auth, savedJobs}) => {
  //console.log("In SavedJobs, auth=", auth);
  try {
    const response = await axios.get(`/api/favorites`);
    //console.log(response.data);
    const favorites = response.data;
    console.log("Favorites: ",favorites);
    /* read from listings table
    try {
      console.log("In SavedJobs, calling axios for listings");
      const data = await axios.get('/api/listings');
      console.log("In SavedJobs, job_listings:",data);
    } catch(error) {
      console.error(error);
    }*/
  } catch(error) {
    console.error(error);
  }
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
