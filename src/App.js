import React, {useEffect, useState} from 'react';
import { Route, useHistory } from 'react-router-dom';
import axios from 'axios';

import Navbar from './navbar';
import Jobs from './jobs';
import Details from './jobs/Details';
import SavedJobs from './jobs/SavedJobs.js';
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
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [tempJob, setTempJob] = useState(null);

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
    setFavorites([]);
    setSavedJobs([]);
    setTempJob(null);
    history.push('/');
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

  useEffect(
    () => {
      if(tempJob !== null) {
        addToFavorites(tempJob);
        setTempJob(null);
      }
    }, 
    [auth]
  )

  const addToFavorites = (newJob) => {
    axios.post('/api/saved_jobs', newJob, headers())
      .then(response => {
        const savedJobId = response.data.id;
        const listingId = response.data.listingId;
        axios.post(`api/favorites/${auth.id}`, {savedJobId, listingId}, headers())
          .then(_response => {
            setFavorites([...favorites, _response.data])
          })
      })
  };

  const removeFromFavorites = (listingId) => {
    axios.delete(`/api/favorites/${auth.id}`, {data: {listingId}}, headers())
      .then(() => {
        setFavorites(favorites.filter(favorite => favorite.listingId !== listingId));
        setSavedJobs(savedJobs.filter(saved => saved.listingId !== listingId));
      })
  };

  
const history = useHistory();
return (
    <div>
      <Navbar logout={logout} auth={auth} />

      <Route exact path='/' >
        <Jobs jobs={jobs} setJobs = {setJobs} savedJobs={savedJobs} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} auth={auth} setTempJob={setTempJob} />
      </Route>        

      <Route exact path='/jobs/saved'>
        <SavedJobs auth={auth} savedJobs={savedJobs} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />
      </Route>

      <Route path='/account'>
        <Account login={login} createAccount={createAccount} />
      </Route>
      
      <Route path='/job/:id' render={(params) => <Details {...params} jobs={jobs} />} />
    </div>
  );
}

export default App;
