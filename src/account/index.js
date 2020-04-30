import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Login from './Login';
import Profile from './Profile';

const Account = ({ login, createAccount, auth, logout, savedJobs }) => {
  return (
    <div>
      <Switch>
        <Route path='/account/profile'>
          <Profile auth={auth} logout={logout} savedJobs={savedJobs} />
        </Route>

        <Route path='/account/login'>
          <Login login={login} />
        </Route>
        
        <Route path='/account/create'>
          <CreateAccount createAccount={createAccount} />
        </Route>
      </Switch>
    </div>
  );
};

export default Account;