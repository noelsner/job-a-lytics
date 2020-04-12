import React from 'react';

const NavButtons = ({history, auth}) => {
  return(
    <div className='flex'>
      <button onClick={ev => history.push('/')} className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Discover</button>
      {auth.id && (
        <button onClick={ev => history.push('jobs/saved')} className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Saved Jobs</button>
      )}
    </div>
  );
};

export default NavButtons;