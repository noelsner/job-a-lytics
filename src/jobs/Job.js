import React, {useState} from "react";
import Heart from '../icons/heart';
import axios from "axios";

const Job = ({job, savedJobs}) => {
  const [savedBtn, setSavedBtn] = useState(false)

  const toggleSaved = (ev, id) => {
    ev.preventDefault();
    setSavedBtn(!savedBtn);
    saveJob(id);
  };

  const saveJob = (id) => {
    console.log(`Save Job:`, job);
    savedJobs.push(job);

    //TODO: add this job to the listings table (& favorites table for the current user)
    /*axios.post(`/api/job_listings`,job)
    .then(response => console.log(response))
    .catch()*/
  }

  return(
    <li key={job.id}>
      <div className='bg-gray-800 text-gray-600 mt-6 rounded-lg p-4'>
        <div className='flex justify-between align-middle w-full'>
          <a className='text-gray-300 text-2xl mr-10 leading-tight'>{job.job_title}</a>
          <button onClick={ev => toggleSaved(ev, job.id)} className='focus:outline-none focus:text-gray-500'>
            <Heart classes={`fill-current text-gray-${savedBtn ? '200' : '700'} w-4 h-4`} />
          </button>
        </div>
        <div className='text-gray-400 text-lg font-bold mt-2'>{job.company_name}</div>
        <div className='text-gray-400 text-lg mt-2 leading-snug'>{job.location}</div>
        <div className='text-gray-500 text-md mt-3'>
          <span className='capitalize leading-snug'>{job.job_description.slice(0,100)}</span>
          <span>{/*results.snippet.slice(1, results.snippet.length)*/}</span>
        </div>
        <button onClick={ev => {
          toggleSaved(ev, job.id)
        }} className='block text-gray-400 text-xs underline mt-2'>Save Job</button>
      </div>
    </li>
  )
}

export default Job;
