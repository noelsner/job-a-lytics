import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Login from './Login';

const Account = ({ login, createAccount, loginGoogle }) => {
  return (
    <div>
      <Switch>
        <Route path='/account/login'>
          <Login login={login} loginGoogle={loginGoogle} />
        </Route>
        
        <Route path='/account/create'>
          <CreateAccount createAccount={createAccount} />
        </Route>
      </Switch>
    </div>
  );
};

export default Account;