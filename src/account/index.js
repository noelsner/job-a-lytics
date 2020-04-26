import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Login from './Login';
import Oauth from './Oauth';
import io from 'socket.io-client';

const API_URL = '';
const socket = io(API_URL)
const providers = ['linkedin', 'google', 'github' ];

const Account = ({ login, createAccount }) => {
  return (
    <div>
      <Switch>
        <Route path='/account/login'>
          <Login login={login} />
          <div>
            {providers.map(provider => 
              <Oauth provider={provider} key={provider} socket={socket} /> 
            )}
          </div>
        </Route>
        
        <Route path='/account/create'>
          <CreateAccount createAccount={createAccount} />
        </Route>
      </Switch>
    </div>
  );
};

export default Account;