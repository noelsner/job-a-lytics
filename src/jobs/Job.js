import React, {useState, useEffect} from "react";
import Heart from '../icons/heart';
import { Link, useHistory } from 'react-router-dom';

const Job = ({job, savedJobs, favorites, addToFavorites, removeFromFavorites, auth, setTempJob}) => {
  const history = useHistory();

  const toggleSaved = (ev) => {
    ev.preventDefault();
    if(auth.id) {
      const savedJobIds = savedJobs.map(fav => fav.listingId);
  
      if(savedJobIds.includes(job.listingId))
        removeFromFavorites(job.listingId);
      if(!savedJobIds.includes(job.listingId))
        addToFavorites(job);

     } else {
       setTempJob(job);
       history.push('/account/login');
     }
  };

  return(
    <li key={job.listingId}>
      <div className='bg-gray-800 text-gray-600 mt-6 rounded-lg p-4'>
        <div className='flex justify-between align-middle w-full'>
          <Link to={`/job/${job.listingId}`} className='text-gray-300 text-2xl mr-10 leading-tight'>{job.title}</Link>
          <button onClick={ev => toggleSaved(ev)} className='focus:outline-none focus:text-gray-500'>
            <Heart classes={`fill-current text-gray-${savedJobs.some(j => j.listingId === job.listingId) ? '200' : '700'} w-4 h-4`} />
          </button>
        </div>
        <div className='text-gray-400 text-lg font-bold mt-2'>{job.company}</div>
        <div className='text-gray-400 text-lg mt-2 leading-snug'>{job.location}</div>
        <div className='text-gray-500 text-md mt-3'>
          <span className='capitalize leading-snug'>{job.description.slice(0,100)}...</span>
        </div>
        <button onClick={ev => {
          toggleSaved(ev)
        }} className='block text-gray-400 text-xs underline mt-2'>{savedJobs.some(j => j.listingId === job.listingId) ? 'Remove From Saved' : 'Save Job' }</button>
      </div>
    </li>
  )
}

export default Job;
