import React, { useState } from "react";
import Logo from '../icons/logo';
import { useHistory } from 'react-router-dom';


const CreateAccount = ({ login }) => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    login({ username, password })
      .then(() => {
        setError("");
        window.location.hash = "#";
      })
      .catch((ex) => {
        setError(ex.response.data.message);
      });
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full'>
        <div className='flex flex-col align-center'>
          <button onClick={ev => history.push('/')} className="flex justify-center focus:outline-none">
            <Logo classes={'fill-current text-pink-500 h-8 w-8'} />
          </button>
          <h2 className="mt-3 text-center text-3xl leading-9 font-extrabold text-gray-200">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-500">
            <span className=''>Or</span>
            <a  onClick={ev => history.push('/account/create')} className="ml-1 font-medium text-gray-200 underline hover:text-bold focus:outline-none focus:underline transition ease-in-out duration-150">
              create an account
            </a>
          </p>
        </div>


        <div className='bg-gray-800 rounded-lg p-6 mt-6'>
          <form onSubmit={onSubmit}>

            <div className='flex-1 px-3'>
              <label className='block text-gray-400 text-md  mb-1 ' htmlFor='username'>Username</label>
              <input value={username} onChange={(ev) => setUsername(ev.target.value)} className='appearance-none block w-full bg-gray-400 text-gray-600 placeholder-gray-700 border border-gray-400 rounded-md py-1 px-2 focus:outline-none focus:bg-gray-200' id='username' type='username' ></input>
            </div>

            <div className='flex-1 px-3 mt-4'>
              <label className='block text-gray-400 text-md  mb-1 ' htmlFor='password'>Password</label>
              <input value={password} onChange={(ev) => setPassword(ev.target.value)} className='appearance-none block w-full bg-gray-400 text-gray-600 placeholder-gray-700 border border-gray-400 rounded-md py-1 px-2 focus:outline-none focus:bg-gray-200' id='password' type='password' ></input>
            </div>

            <div className='mt-6 mx-3'>
              <button type='submit' className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-md leading-5 font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:border-pink-900 focus:shadow-outline-pink active:bg-pink-900 transition duration-150 ease-in-out'>Sign in</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
