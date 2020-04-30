import React from 'react';
import UserPlaceholder from '../icons/user_placeholder';
import { useHistory } from 'react-router-dom';

const Profile = ({ auth, logout, savedJobs }) => {
  const history = useHistory();

  const signOut = (ev) => {
    logout();
    history.push('/');
  };

  return (
    <div className='max-w-md w-full mx-auto mt-10'>
      <div className='bg-gray-800 rounded-lg p-6'>
        { auth.picture ? (
          <img src={auth.picture} alt='user profile picture' className='h-24 w-24 rounded-full mx-6'/>
        ) : (
          <UserPlaceholder classes={'fill-current text-gray-400 h-24 w-24 mx-6'} />
        )}
        
        <div className='text-gray-300 text-xl mt-6 ml-6'>
          <span className='mr-6 font-bold'>Name:</span>
          {auth.name}
        </div>
        <div className='text-gray-300 text-xl mt-6 ml-6'>
          <span className='mr-6 font-bold'>Username:</span>
          {auth.username}
        </div>
        <div className='text-gray-300 text-xl mt-6 ml-6'>
          <span className='mr-6 font-bold'>Number of jobs saved:</span>
          {savedJobs.length}
        </div>
        <button className='text-gray-400 text-md mt-6 ml-6 underline' onClick={ signOut }>Sign out</button>
      </div>
    </div>
  );
};

export default Profile;