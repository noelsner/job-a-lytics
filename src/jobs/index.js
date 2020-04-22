import React, {useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchBar from './SearchBar';
import JobResults from './JobResults';
import Sidebar from './Sidebar';

const Jobs = ({jobs, setJobs, savedJobs, favorites, addToFavorites, removeFromFavorites, auth, setTempJob}) => {

  // These state variables are set by user input in SearchBar
  const [inputQuery, setInputQuery] = useState(' ');
  const [inputLocation, setInputLocation] = useState(' ');

 return (
    <Switch>
      <Route>
        <SearchBar setJobs = {setJobs}
              inputQuery = {inputQuery} setInputQuery={setInputQuery}
              inputLocation={inputLocation} setInputLocation = {setInputLocation}/>
        <div className='flex flex-col md:flex-row w-full h-screen px-6 mt-8 md:mt-12'>
          <div className='md:w-32 px-3 md:pl-0 mb-6 md:mb-0'>
            <Sidebar jobs={jobs} setJobs={setJobs}/>
          </div>
          <div className='w-full'>
            <JobResults jobs={jobs} savedJobs={savedJobs}
                favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites}
                auth={auth} setTempJob={setTempJob}
                inputQuery={inputQuery} setInputQuery={setInputQuery} inputLocation={inputLocation} />
          </div>
        </div>
      </Route>
    </Switch>
  );
};

export default Jobs;
