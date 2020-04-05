import React from 'react';

const UserDropdown = ({userRef}) => {
  return(
    <div ref={userRef} className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg">
      <div className="py-1 rounded-md bg-white shadow-xs">
        <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Your Profile</a>
        <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Settings</a>
        <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Sign out</a>
      </div>
    </div>
  );
};

export default UserDropdown;