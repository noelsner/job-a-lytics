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
import CreateAccount from './account/CreateAccount';
import Login from './account/Login';

console.log(seedJobData);
const App = ()=> {
  const [jobs, setJobs] = useState(seedJobData);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    console.log("In useEffect");
    fetchJobs().then((jobs) => setSavedJobs(jobs));
  }, []);

  const createAccount = () => console.log('create account');
  const login = () => console.log('login');

  console.log("In job_listings App")
  return (
    <div>
      <Navbar />
      <Route path='/' exact>
        <SearchBar />
        <div className='flex flex-col md:flex-row w-full h-screen px-6 mt-12'>
          <div className='md:w-1/5'>
            <Sidebar jobs={jobs} />
          </div>
          <div className='md:w-2/5'>
            <Jobs jobs={jobs} />
          </div>
          <div className='hidden md:block md:w-2/5'>
            <Details jobs={jobs} />
          </div>
        </div>
      </Route>
      <Route path='/jobs/saved' exact>
        <SavedJobs />
      </Route>
      <Route path='/account/login' exact>
        <Login login={login} />
      </Route>
      <Route path='/account/create' exact>
        <CreateAccount createAccount={createAccount} />
      </Route>
    </div>
  );
}

export default App;
