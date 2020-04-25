import React, { useState } from 'react';
import DropdownFilter from './DropdownFilter';
import moment from 'moment';
import axios from 'axios';

const Sidebar = ({jobs, setJobs, inputLocation}) => {
  console.log("In Sidebar, Input Location:", inputLocation);
  const inputZip = inputLocation;

  const [openDropdown1, setOpenDropdown1] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);

  const getZips = async (zip, radius) => {
    console.log("In getZips, zip = ", zip, " radius = ", radius);
    // ${zip}/${radius}
    try {
     const response = await axios.get(`/api/zipcodes`)
     return response.data;
    } catch (ex) {
      console.log(ex);
    }
  };

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
                setJobs([...jobs]);
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
              click: (ev)=>{
                console.log('10mi filter clicked!!!');
                const zips = getZips( inputZip, 10 );
                console.log("zips=", zips);
                /* Next step
                for( let i = 0; i < zips.length; i++ ) {
                  const okCities = getCityFromZip( zips[i] );
                }*/
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
