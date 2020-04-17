import React, {useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './navbar';
import Jobs from './jobs';
import SavedJobs from './SavedJobs.js';
import seedJobData from './seedJobData';
import Account from './account';


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

return (
    <div>
      <Navbar logout={logout} auth={auth} />

      <Route exact path='/'>
        <Jobs jobs={jobs} setJobs = {setJobs} />
      </Route>

      <Route exact path='/jobs/saved'>
        <SavedJobs auth={auth} savedJobs={savedJobs} />
      </Route>

      <Route path='/account'>
        <Account login={login} createAccount={createAccount} />
      </Route>
    </div>
  );
}

export default App;
