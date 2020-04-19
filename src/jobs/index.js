import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchBar from './SearchBar';
import JobResults from './JobResults';
import Sidebar from './Sidebar';

const Jobs = ({jobs, setJobs, savedJobs, setSavedJobs}) => {
  return (
    <Switch>
      <Route>
        <SearchBar setJobs = {setJobs}/>
        <div className='flex flex-col md:flex-row w-full h-screen px-6 mt-8 md:mt-12'>
          <div className='md:w-32 px-3 md:pl-0 mb-6 md:mb-0'>
            <Sidebar jobs={jobs} />
          </div>
          <div className='w-full'>
            <JobResults jobs={jobs} savedJobs={savedJobs} setSavedJobs={setSavedJobs} />
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