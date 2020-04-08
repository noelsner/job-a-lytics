import React, {useState} from "react";
import Heart from '../icons/heart';

const Jobs = ({ jobs }) => {
  console.log('jobs :', jobs);
  //jobs.forEach(job=> console.log(job.title));

  const [savedBtn, setSavedBtn] = useState(false)

  const saveJob = () => console.log('Job saved!!!')

  const toggleSaved = (ev) => {
    ev.preventDefault();
    setSavedBtn(!savedBtn);
    saveJob();
  };

  return (
    <div className='px-3'>
      <header>
        <div className='text-gray-500 text-xl'>Results for "{jobs[0].query}" in {jobs[0].location}.</div>
        <div className='text-gray-600 text-sm'>Showing 1-10 of {jobs[0].totalResults} jobs.</div>
      </header>
      <ul>
        {jobs.map((job) => {
          //const results = job.results[0];
          return(
            <li key={job.id}>
              <div className='bg-gray-800 text-gray-600 mt-6 rounded-lg p-4'>
                {/* <a className='text-gray-400 text-2xl'>{job.title}</a>
                <div className='text-gray-500 text-lg font-bold'>{job.company}</div>
                <div className='text-gray-500 text-lg'>{job.location}</div>
                <div className='text-gray-600 text-md mt-4'> */}
                <div className='flex justify-between align-middle w-full'>
                  <a className='text-gray-300 text-2xl mr-10'>{job.title}</a>
                  <button onClick={ev => toggleSaved(ev)} className='focus:outline-none focus:text-gray-500'>
                    <Heart classes={`fill-current text-gray-${savedBtn ? '200' : '700'} w-4 h-4`} />
                  </button>
                </div>
                <div className='text-gray-400 text-lg font-bold'>{job.company}</div>
                <div className='text-gray-400 text-lg'>{job.location}</div>
                <div className='text-gray-500 text-md mt-4'>
                  <span className='capitalize'>{job.description.slice(0,100)}</span>
                  <span>{/*results.snippet.slice(1, results.snippet.length)*/}</span>
                </div>
                <a onClick={saveJob} className='block text-gray-400 text-xs underline mt-2'>Save Job</a>
              </div>
            </li>
          )
          })}
      </ul>
    </div>
  );
};

export default Jobs;
