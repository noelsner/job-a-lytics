import React, {useState, useRef} from 'react';
import outsideClick from '../navbar/OutsideClick';
import DropdownOptions from './DropdownOptions';

const DropdownFilter = ({filterTitle, ddOptions, openDropdown, setOpenDropdown }) => {
  const ref = useRef();

  outsideClick(ref, () => {
    if(openDropdown) {
      setOpenDropdown(false);
    }
  });

  return(
    <div>
      <div>
        <span className="rounded-md shadow-sm w-full">
          <button type="button" onClick={() => setOpenDropdown(!openDropdown)} className="inline-flex justify-center w-full rounded-md px-2 py-1 border border-2 border-gray-500 text-gray-500 hover:text-gray-300 focus:outline-none focus:border-transparent focus:bg-gray-500 focus:text-gray-800 active:bg-gray-500 active:text-gray-800 ">
            {filterTitle}
            <svg className="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </span>
      </div>
      { openDropdown && (
        <DropdownOptions _ref={ref} ddOptions={ddOptions} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
      )}
    </div>
  );
};

export default DropdownFilter;