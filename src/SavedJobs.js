import React from 'react';
import axios from 'axios';

const SavedJobs = async (user_id) => {
  console.log("In SavedJobs, user_id = ", user_id);
  //TODO: pass user_id into axios call
  try {
    const response = await axios.get(`/api/favorites`);
    console.log(response.data);
    return response.data;
  } catch(error){
    console.error(error);
  }

  return (
    <div> display user's saved jobs </div>
  );
};

export default SavedJobs;
