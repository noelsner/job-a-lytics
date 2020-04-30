import React from 'react';
import { useHistory, Link } from 'react-router-dom';

const UserDropdown = ({userRef, logout}) => {
  const history = useHistory();
  return(
    <div ref={userRef} className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg">
      <div className="py-1 rounded-md bg-white shadow-xs">
        <Link to='/account/profile' className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Your Profile</Link>
        <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" onClick={ logout }>Sign out</a>
      </div>
    </div>
  );
};

export default UserDropdown;