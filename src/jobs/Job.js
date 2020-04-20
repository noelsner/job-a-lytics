import React, {useState, useEffect} from "react";
import Heart from '../icons/heart';
import { Link } from 'react-router-dom';

const Job = ({job, savedJobs, favorites, addToFavorites, removeFromFavorites}) => {
  const [savedBtn, setSavedBtn] = useState(false)

  useEffect(
    () => {
      savedJobs && (
        savedJobs.forEach( saved => {
          if(saved.listingId === job.listingId) {
            setSavedBtn(true);
          }
        })
      )
    },
    [savedJobs]
  )

  const toggleSaved = (ev) => {
    ev.preventDefault();
    setSavedBtn(!savedBtn);
    const savedJobIds = savedJobs.map(fav => fav.listingId);

    if(savedJobIds.includes(job.listingId)) {
      removeFromFavorites(job.listingId);
    }
    if(!savedJobIds.includes(job.listingId)) {
      addToFavorites(job);
    }

  };

  return(
    <li key={job.listingId}>
      <div className='bg-gray-800 text-gray-600 mt-6 rounded-lg p-4'>
        <div className='flex justify-between align-middle w-full'>
          <Link to={`/job/${job.id}`} className='text-gray-300 text-2xl mr-10 leading-tight'>{job.title}</Link>
          <button onClick={ev => toggleSaved(ev)} className='focus:outline-none focus:text-gray-500'>
            <Heart classes={`fill-current text-gray-${savedBtn ? '200' : '700'} w-4 h-4`} />
          </button>
        </div>
        <div className='text-gray-400 text-lg font-bold mt-2'>{job.company}</div>
        <div className='text-gray-400 text-lg mt-2 leading-snug'>{job.location}</div>
        <div className='text-gray-500 text-md mt-3'>
          <span className='capitalize leading-snug'>{job.description.slice(0,100)}...</span>
          <span>{/*results.snippet.slice(1, results.snippet.length)*/}</span>
        </div>
        <button onClick={ev => {
          toggleSaved(ev)
        }} className='block text-gray-400 text-xs underline mt-2'>Save Job</button>
      </div>
    </li>
  )
}

export default Job;
