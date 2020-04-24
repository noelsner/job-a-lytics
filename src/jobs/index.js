import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchBar from './SearchBar';
import JobResults from './JobResults';
import Sidebar from './Sidebar';

const Jobs = ({jobs, setJobs, savedJobs, favorites, addToFavorites, removeFromFavorites, auth, setTempJob}) => {
  return (
    <Switch>
      <Route>
        <SearchBar setJobs = {setJobs}/>
        <div className='flex flex-col md:flex-row w-full h-screen px-6 mt-8 md:mt-12'>
          <div className='md:w-32 px-3 md:pl-0 mb-6 md:mb-0'>
            <Sidebar jobs={jobs} />
          </div>
          <div className='w-full'>
            {jobs.length ? (
              <JobResults jobs={jobs} savedJobs={savedJobs} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} auth={auth} setTempJob={setTempJob} />
            ) : (
              <div>
                <div className='text-gray-300 text-2xl px-3 md:pr-0 leading-tight'>Please enter a job keyword or location in the search bars above.</div>
              </div>
            )
          }
          </div>
        </div>
      </Route>
      {/* <Route path='/job/:id' >
        <Details jobs={jobs} />
      </Route> */}
    </Switch>
  );
};

export default Jobs;