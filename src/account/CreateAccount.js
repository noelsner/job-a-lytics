import React, { useState } from 'react';
import Logo from '../icons/logo';
import { useHistory, Link } from 'react-router-dom';


const CreateAccount = ({ createAccount }) => {
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (ev) => {
    ev.preventDefault();
    createAccount({
      name: `${firstName} ${lastName}`,
      username,
      password
    });
    history.push('/');
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full'>

        <div className='flex flex-col align-center'>
          <button onClick={ev => history.push('/')} className='flex justify-center focus:outline-none'>
            <Logo classes={'fill-current text-pink-600 h-8 w-8'} />
          </button>
          <h2 className='mt-3 text-center text-3xl leading-9 font-extrabold text-gray-200'>
            Create an account
          </h2>
        </div>

        <div className='bg-gray-800 rounded-lg p-6 mt-6'>
          <form onSubmit={onSubmit}>
            <div className='flex-1 px-3'>
              <label className='block text-gray-400 text-md  mb-1 ' htmlFor='firstName'>First Name*</label>
              <input value={firstName} onChange={(ev) => setFirstName(ev.target.value)} className='appearance-none block w-full bg-gray-400 text-gray-600 placeholder-gray-700 border border-gray-400 rounded-md py-1 px-2 focus:outline-none focus:bg-gray-200' id='firstName' type='text' ></input>
            </div>

            <div className='flex-1 px-3 mt-4'>
              <label className='block text-gray-400 text-md  mb-1 ' htmlFor='lastName'>Last Name*</label>
              <input value={lastName} onChange={(ev) => setLastName(ev.target.value)} className='appearance-none block w-full bg-gray-400 text-gray-600 placeholder-gray-700 border border-gray-400 rounded-md py-1 px-2 focus:outline-none focus:bg-gray-200' id='lastName' type='text' ></input>
            </div>

            <div className='flex-1 px-3 mt-4'>
              <label className='block text-gray-400 text-md  mb-1 ' htmlFor='username'>Username*</label>
              <input value={username} onChange={(ev) => setUsername(ev.target.value)} className='appearance-none block w-full bg-gray-400 text-gray-600 placeholder-gray-700 border border-gray-400 rounded-md py-1 px-2 focus:outline-none focus:bg-gray-200' id='username' type='username' ></input>
            </div>

            <div className='flex-1 px-3 mt-4'>
              <label className='block text-gray-400 text-md  mb-1 ' htmlFor='password'>Password*</label>
              <input value={password} onChange={(ev) => setPassword(ev.target.value)} className='appearance-none block w-full bg-gray-400 text-gray-600 placeholder-gray-700 border border-gray-400 rounded-md py-1 px-2 focus:outline-none focus:bg-gray-200' id='password' type='password' ></input>
            </div>
            <div className='text-gray-600 text-sm mt-2 px-3'>* = required field</div>

            <div className='mt-4 mx-3'>
              <button type='submit' className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-md leading-5 font-medium rounded-md text-white bg-pink-600 focus:outline-none active:bg-pink-900 transition duration-150 ease-in-out ${(!password || !username) ? 'cursor-not-allowed hover:bg-pink-600' : 'hover:bg-pink-700'}`}>Create</button>
            </div>
          </form>

          <div className='mt-2 mx-3 text-gray-400 text-md'>
            Already have an account? <span><Link to='/account/login' className='text-gray-400 underline text-md hover:text-gray-200 focus:outline-none focus:bold transition ease-in-out duration-150'>Sign in here</Link></span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
