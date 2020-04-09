import React from 'react';
import { readFavorites } from '../favorites_routes.js';

const SavedJobs = (user_id) => {
  console.log("In SavedJobs, user_id = ", user_id);
  const favorites = readFavorites(user_id);
  console.log(favorites);
  return (
    <div> display user's saved jobs </div>
  );
};

export default SavedJobs;
