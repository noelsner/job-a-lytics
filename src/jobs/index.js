import React, {useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchBar from './SearchBar';
import JobResults from './JobResults';
import Sidebar from './Sidebar';
import ReactLoading from 'react-loading';

const Jobs = ({ jobs, setJobs, savedJobs, favorites, addToFavorites, removeFromFavorites, auth, setTempJob, savedJobSet, loading, setLoading, setUserLocation }) => {

  // These state variables are set by user input in SearchBar
  const [inputQuery, setInputQuery] = useState('');
  const [inputLocation, setInputLocation] = useState('');
  const [searchResults, setSearchResults] = useState({});

 return (
    <Switch>
      <Route>
        <SearchBar setJobs = {setJobs} inputQuery = {inputQuery} setInputQuery={setInputQuery} inputLocation={inputLocation} setInputLocation={setInputLocation} setLoading={setLoading} loading={loading} setSearchResults={setSearchResults} setUserLocation={setUserLocation} />
        {loading ? (
          <ReactLoading className='loading' type={'bubbles'} color={'#718096'} height={'100px'} width={'100px'} />
        ) : (
          jobs.length ? (
            <div className='flex flex-col md:flex-row w-full h-screen px-6 mt-8 md:mt-12'>
              <div className='md:w-32 px-3 md:pl-0 mb-6 md:mb-0'>
                <Sidebar jobs={jobs} setJobs={setJobs} inputLocation={inputLocation}/>
              </div>
              <div className='w-full'>
                <JobResults jobs={jobs} savedJobs={savedJobs} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} auth={auth} setTempJob={setTempJob} savedJobSet={savedJobSet} inputQuery={inputQuery} inputLocation={inputLocation} searchResults={searchResults} />
              </div>
            </div>
          ) : (
            <div>
              <div className='text-gray-600 text-2xl mx-6 px-3 leading-tight text-center mt-16'>Please enter a job keyword or location above.</div>
            </div>
          )
        )}
      </Route>
    </Switch>
  );
};

export default Jobs;
