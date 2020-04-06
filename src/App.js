import React, {useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import fetchJobs from './api.js';
import Jobs from './Jobs.js';
import Navbar from './navbar/Navbar';
import SearchBar from './SearchBar';
import SavedJobs from './SavedJobs.js';

const App = ()=> {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    console.log("In useEffect");
    fetchJobs().then((jobs) => setJobs(jobs));
  }, []);

  console.log("In job_listings App")
  return (
    <div>
      <Navbar />
      <Route path='/' exact>
        <SearchBar />
        <Jobs jobs={jobs}/>
      </Route>
      <Route path='jobs/saved' exact>
        <SavedJobs />
      </Route>
    </div>
  );
}

export default App;
