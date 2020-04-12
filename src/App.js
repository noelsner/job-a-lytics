import React, {useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

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

const headers = () => {
  const token = window.localStorage.getItem('token');
  return {
    headers: {
      authorization: token
    }
  };
};

const App = ()=> {
  const [auth, setAuth] = useState({});
  const [jobs, setJobs] = useState(seedJobData);
  const [savedJobs, setSavedJobs] = useState([]);

  const login = async (credentials) => {
    const token = (await axios.post('/api/auth', credentials)).data.token;
    window.localStorage.setItem('token', token);
    exchangeTokenForAuth();
  };

  const exchangeTokenForAuth = async () => {
    const response = await axios.get('/api/auth', headers());
    setAuth(response.data);
  };

  useEffect(() => {
    exchangeTokenForAuth();
  }, []);

  useEffect(() => {
    fetchJobs().then((jobs) => setSavedJobs(jobs));
  }, []);

  const createAccount = (user) => {
    axios.post('/api/users', user)
      .then(response => {
        window.localStorage.setItem('token', response.data.token);
        setAuth(response.data.user);
      });
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    setAuth({});
    window.location.hash = '#'
  };

  console.log('auth :', auth);
  
  return (
    <div>
      <Navbar logout={logout} />
      <Route path='/' exact>
        <SearchBar setJobs = {setJobs}/>
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
