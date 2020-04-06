import React from "react";

const Jobs = ({ jobs }) => {
  console.log('jobs :', jobs);
  return (
    <div className='px-3'>
      <header>
        <div className='text-gray-500 text-xl'>Results for "{jobs[0].query}" in {jobs[0].location}.</div>
        <div className='text-gray-600 text-sm'>Showing 1-10 of {jobs[0].totalResults} jobs.</div>
      </header>
      <ul>
        {jobs.map((job) => {
          const results = job.results[0];
          return(
            <li key={results.jobkey}>
              <div className='bg-gray-800 text-gray-600 mt-6 rounded-lg p-4'>
                <a className='text-gray-400 text-2xl'>{results.jobtitle}</a>
                <div className='text-gray-500 text-lg font-bold'>{results.company}</div>
                <div className='text-gray-500 text-lg'>{results.formattedLocation}</div>
                <div className='text-gray-600 text-md mt-4'>
                  <span className='capitalize'>{results.snippet[0]}</span>
                  <span>{results.snippet.slice(1, results.snippet.length)}</span>
                </div>
              </div>
            </li>
          )
          })}
      </ul>
    </div>
  );
};

export default Jobs;