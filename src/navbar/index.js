import React, {useState, useRef} from 'react';
import Logo from '../icons/logo';
import UserPlaceholder from '../icons/user_placeholder';
import Hamburger from '../icons/hamburger';
import { useHistory } from 'react-router-dom';
import outsideClick from './OutsideClick';
import HamburgerMenu from './HamburgerMenu';
import UserDropdown from './UserDropdown';
import NavButtons from './NavButtons';

const Navbar = () => {
  const history = useHistory();
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);
  const userRef = useRef();
  const hamRef = useRef();

  outsideClick(userRef, () => {
    if(openUserDropdown) {
      setOpenUserDropdown(false);
    }
  });

  outsideClick(hamRef, () => {
    if(openHamburger) {
      setOpenHamburger(false);
    }
  });

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button onClick={() => setOpenHamburger(!openHamburger)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out">
              <Hamburger />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <button onClick={ev => history.push('/')} className="block p-0 flex items-center focus:outline-none">
                <Logo classes={'fill-current text-gray-200 h-8 w-8'} />
                <div className='text-2xl text-gray-200 ml-4'>Websitename</div>
              </button>
            </div>
            <div className="flex items-center hidden sm:block sm:ml-6">
              <NavButtons history={history} />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <button onClick={ev => history.push('/account/login')} className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-pink-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Sign In</button>
            </div>
            <div className="ml-3 relative">
              <div>
                <button onClick={() => setOpenUserDropdown(!openUserDropdown)} className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-400 transition duration-150 ease-in-out p-2">
                  <UserPlaceholder classes={'fill-current text-gray-400 h-6 w-6'} />
                </button>
              </div>
              {openUserDropdown && (
                <UserDropdown userRef={userRef} />
              )}
            </div>
          </div>
        </div>
      </div>
      { openHamburger && (
        <HamburgerMenu hamRef={hamRef} history={history} />
      )}
    </nav>
  );
};

export default Navbar;