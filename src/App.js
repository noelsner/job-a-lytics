import React, {useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './navbar';
import Jobs from './jobs';
import Details from './jobs/Details';
import SavedJobs from './jobs/SavedJobs.js';
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
  const [savedJobs, setSavedJobs] = useState([]);
  const [favorites, setFavorites] = useState([]);

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
    setUserFavorites([]);
    setSavedJobs([]);
    window.location.hash = '#'
  };

  useEffect(
    () => {
      if (auth.id) {
        const token = window.localStorage.getItem('token');
        axios.get(`/api/favorites/${auth.id}`, headers())
          .then((response) => {
            setFavorites(response.data);
          });
      }
    },
    [auth]
  );

  useEffect(
    () => {
      if (auth.id) {
        const token = window.localStorage.getItem('token');
        axios.get(`/api/saved_jobs/${auth.id}`, headers())
          .then((response) => {
            setSavedJobs(response.data);
          });
      }
    },
    [favorites]
  );

  const saveJob = () => {
    console.log('save job')
  };

  console.log('savedJobs :', savedJobs);
  console.log('favorites :', favorites);

return (
    <div>
      <Navbar logout={logout} auth={auth} />

      <Route exact path='/' >
        <Jobs jobs={jobs} setJobs = {setJobs} savedJobs={savedJobs}  />
      </Route>        

      <Route exact path='/jobs/saved'>
        <SavedJobs auth={auth} savedJobs={savedJobs} favorites={favorites} />
      </Route>

      <Route path='/account'>
        <Account login={login} createAccount={createAccount} />
      </Route>
      
      <Route path='/job/:id' render={(params) => <Details {...params} jobs={jobs} />} />
    </div>
  );
}

export default App;
