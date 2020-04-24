import React, { useState } from 'react';
import DropdownFilter from './DropdownFilter';
import moment from 'moment';

const Sidebar = ({jobs, setJobs}) => {

  const [openDropdown1, setOpenDropdown1] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);

  return(
    <div className='rounded-lg h-full text-gray-600'>
      <div className="relative inline-block md:w-full">
        <DropdownFilter openDropdown={openDropdown1} setOpenDropdown={setOpenDropdown1} filterTitle={'Sort by'} ddOptions={
          [
            {
              text: 'Relevance',
              click: ()=>{
                console.log('relevance filter clicked!!!')
                setOpenDropdown1(false);
              }
            },
            {
              text: 'Date',
              click:  ()=>{
                // sort jobs by most recent date
                jobs.sort((l, r) => moment(r.postedDate) - moment(l.postedDate));
                //console.log(jobs);
                setJobs(jobs);
                setOpenDropdown1(false);
              }
            }
          ]
        }/>
      </div>
      <div className="relative inline-block pl-3 md:pl-0 md:w-full md:mt-6 ">
        <DropdownFilter openDropdown={openDropdown2} setOpenDropdown={setOpenDropdown2} filterTitle={'Distance'} ddOptions={
          [
            {
              text: '10 miles',
              click: ()=>{
                console.log('10mi filter clicked!!!');
                setOpenDropdown2(false);
              }
            },
            {
              text: '25 miles',
              click:  ()=>{
                console.log('25mi filter clicked!!!')
                setOpenDropdown2(false);
              }
            },
            {
              text: '50 miles',
              click:  ()=>{
                console.log('50mi filter clicked!!!')
                setOpenDropdown2(false);
              }
            },
            {
              text: '75 miles',
              click:  ()=>{
                console.log('75mi filter clicked!!!')
                setOpenDropdown2(false);
              }
            },
            {
              text: '100 miles',
              click:  ()=>{
                console.log('100mi filter clicked!!!')
                setOpenDropdown2(false);
              }
            },
          ]
        }/>
      </div>
    </div>
  );
};

export default Sidebar;
