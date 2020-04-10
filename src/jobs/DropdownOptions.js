import React from 'react';

const DropdownOptions = ({_ref, ddOptions}) => {
  return (
    <div ref={_ref} className="origin-top-left absolute left-0 mt-2 w-full rounded-md shadow-lg">
      <div className="rounded-md bg-gray-500 shadow-xs">
        <div className="py-1">
          {ddOptions.map((ddOption, idx) => {
            
            return(
              <a onClick={ddOption.click} className="block px-4 py-2 text-sm leading-5 text-gray-800 hover:bg-gray-600 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" key={idx}>{ddOption.text}</a>
            )}
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownOptions;