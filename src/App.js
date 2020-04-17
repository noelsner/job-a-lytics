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
  const [savedJobs, setSavedJobs] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

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

  useEffect(() => {
    if(auth.id) {
        const token = window.localStorage.getItem('token');

        axios.get(`/api/favorites/${auth.id}`)
        .then(response => {
          // copy favorites data to userFavorites array
          const numFavorites = response.data.length;
          for(let jobIdx = 0; jobIdx < numFavorites; jobIdx++ ) {
            userFavorites.push(response.data[jobIdx]);
          }
          //console.log('userFavorites :', userFavorites);

          // Read job_listings from the database
          //console.log("In useEffect: calling axios.get for job_listings");
          axios.get(`/api/job_listings`)
          .then(response => {
            const numListings = response.data.length;
            //console.log(numListings," job_listings= ", response.data);
            // copy job_listings data for this user to favoriteListings array
            const favoriteListings = response.data.map((listing)=> {
              // check if this listing id is in userFavorites
              for(let jobIdx = 0; jobIdx < numFavorites; jobIdx++ ) {
                if( userFavorites[jobIdx].listing_id === listing.id) {
                  //save this listing for display
                  savedJobs.push(listing);
                  return listing;
                } else { return false }
              }
            })
            console.log("The (",numListings,") Favorite listings for ",auth.id," are: ", favoriteListings);
          })
          .catch( ()=> { (console.error("Error on get /api/job_listings")) } );
        });
    }
  })

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
