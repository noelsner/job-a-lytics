import React from 'react';
import DropdownFilter from './DropdownFilter';
import moment from 'moment';

const Sidebar = ({jobs}) => {
  return(
    <div className='rounded-lg h-full text-gray-600'>
      <div className="relative inline-block md:w-full">
        <DropdownFilter filterTitle={'Sort by'} ddOptions={
          [
            {
              text: 'Relevance',
              click: ()=>{console.log('relevance filter clicked!!!')}
            },
            {
              text: 'Date',
              click:  ()=>{
                // sort jobs by most recent date
                jobs.sort((l, r) => moment(r.postedDate) - moment(l.postedDate));
              }
            }
          ]
        }/>
      </div>
      <div className="relative inline-block pl-3 md:pl-0 md:w-full md:mt-6 ">
        <DropdownFilter filterTitle={'Distance'} ddOptions={
          [
            {
              text: '10 miles',
              click: ()=>{console.log('10mi filter clicked!!!')}
            },
            {
              text: '25 miles',
              click:  ()=>{console.log('25mi filter clicked!!!')}
            },
            {
              text: '50 miles',
              click:  ()=>{console.log('50mi filter clicked!!!')}
            },
            {
              text: '75 miles',
              click:  ()=>{console.log('75mi filter clicked!!!')}
            },
            {
              text: '100 miles',
              click:  ()=>{console.log('100mi filter clicked!!!')}
            },
          ]
        }/>
      </div>
    </div>
  );
};

export default Sidebar;
