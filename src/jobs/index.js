import React, {useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchBar from './SearchBar';
import JobResults from './JobResults';
import Sidebar from './Sidebar';

const Jobs = ({jobs, setJobs, savedJobs, favorites, addToFavorites, removeFromFavorites, auth, setTempJob, savedJobSet}) => {

  // These state variables are set by user input in SearchBar
  const [inputQuery, setInputQuery] = useState(' ');
  const [inputLocation, setInputLocation] = useState(' ');

 return (
    <Switch>
      <Route>
        <SearchBar setJobs = {setJobs}
              inputQuery = {inputQuery} setInputQuery={setInputQuery}
              inputLocation={inputLocation} setInputLocation = {setInputLocation}/>
        {jobs.length ? (
          <div className='flex flex-col md:flex-row w-full h-screen px-6 mt-8 md:mt-12'>
            <div className='md:w-32 px-3 md:pl-0 mb-6 md:mb-0'>
              <Sidebar jobs={jobs} setJobs={setJobs}/>
            </div>
            <div className='w-full'>
              <JobResults jobs={jobs} savedJobs={savedJobs} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} auth={auth} setTempJob={setTempJob} savedJobSet={savedJobSet} />
            </div>
          </div>
        ) : (
          <div>
            <div className='text-gray-600 text-2xl mx-6 px-3 leading-tight text-center mt-10'>Please enter a job keyword or location above.</div>
          </div>
        )}
      </Route>
    </Switch>
  );
};

export default Jobs;
