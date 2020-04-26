import React, {useState, useEffect} from "react";
import Heart from '../icons/heart';
import { Link, useHistory } from 'react-router-dom';

const Job = ({job, savedJobs, favorites, addToFavorites, removeFromFavorites, auth, setTempJob, savedJobSet}) => {
  const history = useHistory();

  const toggleSaved = (ev) => {
    ev.preventDefault();
    if(auth.id) {
      if(savedJobSet.has(job.listingId))
        removeFromFavorites(job.listingId);
      if(!savedJobSet.has(job.listingId)) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': job.location}, function(results, status) {
          if (status === 'OK') {
            const _lat = results[0].geometry.location.lat()
            const _lng = results[0].geometry.location.lng()
            addToFavorites({...job, lat: _lat, lng: _lng})
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
      
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
