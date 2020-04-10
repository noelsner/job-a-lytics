import React from 'react';
import DropdownFilter from './DropdownFilter';


const Sidebar = () => {
  return(
    <div className='border border-gray-800 rounded-lg h-full text-gray-600 px-3'>
      <div className="relative inline-block">
        <DropdownFilter filterTitle={'Sort by'} ddOptions={
          [
            {
              text: 'Relevance',
              click: ()=>{console.log('relevance filter clicked!!!')}
            },
            {
              text: 'Date',
              click:  ()=>{console.log('date filter clicked!!!')}
            }
          ]
        }/>
      </div>
    </div>
  );
};

export default Sidebar;