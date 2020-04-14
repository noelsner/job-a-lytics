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
  const [listings, setListings] = useState([]);
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

  useEffect(
    () => {
      if(auth.id) {
        const token = window.localStorage.getItem('token');
        console.log("In useEffect: calling axios.get for /api/favorites")
        axios.get('/api/favorites', headers()).then(response => {
          setSavedJobs(response.data);
          console.log('savedJobs :', savedJobs);
        });
      }
    }, [auth]
  )
/*
  useEffect(() => {
    const dbjobs = fetchJobs();
    setListings(dbjobs);
    console.log("listings:", listings);
  })
*/
 // console.log('auth :', auth);
 // console.log('savedJobs :', savedJobs);

return (
    <div>
      <Navbar logout={logout} auth={auth} />
      <Route path='/' exact>
        <SearchBar setJobs = {setJobs}/>
        <div className='flex flex-col md:flex-row w-full h-screen px-6 mt-8 md:mt-12'>
          <div className='md:w-32 px-3 md:pl-0 mb-6 md:mb-0'>
            <Sidebar jobs={jobs} />
          </div>
          <div className='md:w-1/2'>
            <Jobs jobs={jobs} />
          </div>
          <div className='hidden md:block md:w-1/2 md:pl-3'>
            <Details jobs={jobs} />
          </div>
        </div>
      </Route>
      <Route path='/jobs/saved' exact>
        <SavedJobs auth={auth} savedJobs={savedJobs} />
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
