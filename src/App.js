import React, {useEffect, useState} from 'react';
import fetchJobs from './api.js';
import Jobs from './Jobs.js';

const App = ()=> {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    console.log("In useEffect");
    fetchJobs().then((jobs) => setJobs(jobs));
  }, []);

  console.log("In job_listings App")
  return( <h1> Hello </h1>);
  /*
  return (
    <div className="App">
      <header>
       <h1>Job Listings ({jobs.length})</h1>
      </header>
      <Jobs jobs={jobs}/>
    </div>
  );*/
}

export default App;
