import React from 'react';

const HamburgerMenu = ({ hamRef, history, auth }) => {
  return(
    <div ref={hamRef}>
      <div className="px-2 pt-2 pb-3">
        <a onClick={ev => history.push('/')} className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Find Jobs</a>

        {auth.id && (
          <a onClick={ev => history.push('/jobs/saved')} className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Saved Jobs</a>
        )}
      </div>
    </div>
  );
};

export default HamburgerMenu;