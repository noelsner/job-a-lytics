import React, {useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import fetchJobs from './fetchJobs.js';
import Navbar from './navbar';
import SearchBar from './SearchBar';
import Jobs from './jobs';
import Sidebar from './jobs/Sidebar.js';
import Details from './jobs/Details'
import SavedJobs from './SavedJobs.js';
import seedJobData from './seedJobData';

console.log(seedJobData);
const App = ()=> {
  const [jobs, setJobs] = useState(seedJobData);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    console.log("In useEffect");
    fetchJobs().then((jobs) => setSavedJobs(jobs));
  }, []);

  console.log("In job_listings App")
  return (
    <div>
      <Navbar />
      <Route path='/' exact>
        <SearchBar />
        <div className='flex flex-row w-full h-screen px-6 mt-12'>
          <div className='w-1/5'>
            <Sidebar jobs={jobs} />
          </div>
          <div className='w-2/5'>
            <Jobs jobs={jobs} />
          </div>
          <div className='w-2/5'>
            <Details jobs={jobs} />
          </div>
        </div>
      </Route>
      <Route path='jobs/saved' exact>
        <SavedJobs />
      </Route>
    </div>
  );
}

export default App;
