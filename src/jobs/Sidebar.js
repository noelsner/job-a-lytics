import React, { useState } from 'react';
import DropdownFilter from './DropdownFilter';
import moment from 'moment';
import axios from 'axios';

const Sidebar = ({jobs, setJobs, inputLocation}) => {
  console.log("In Sidebar, Input Location:", inputLocation);
  console.log("jobs=", jobs);

  const ZIPCODE = 1;
  const CITYNAME = 2;
  let locType = ZIPCODE;
  const numbers = ['1','2','3','4','5','6','7','8','9','0'];
  // Determine type of input location: city name, or zip
  console.log("inputLocation[0]=", inputLocation[0]);
  if( numbers.includes(inputLocation[0]) ){
    locType = ZIPCODE;
    const inputZip = inputLocation;
  } else {
    locType = CITYNAME;
  }

  const [openDropdown1, setOpenDropdown1] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);

  const getZips = async (zip, radius) => {
    console.log("In getZips, zip = ", zip, " radius = ", radius);

    try {
      const response = await axios.get(`/api/zipcodes?centerZip=${zip}&radius=${radius}`)

      const cities = [];
      //console.log("Number of acceptable zip codes = ", response.data.zip_codes.length);
      for( let i = 0; i < response.data.zip_codes.length; i++ ) {
        // build array of acceptable cities
        if( !cities.includes(response.data.zip_codes[i].city) ) {
          // add new city
          cities.push(response.data.zip_codes[i].city);
        }
      }
      console.log("(",cities.length,") acceptable cities: ", cities);
      // Filter jobs by cities
      let locStr = '';
      const filteredJobs = jobs.filter( (job)=> {
        // compare strings
        locStr = job.location.split(',');  // locStr[0] contains city, locStr[1] contains state
        //console.log("city = ", locStr);
        if( cities.includes(locStr[0])){
          return job;
        }
      });
      console.log("(",filteredJobs.length,") jobs:", filteredJobs );
      setJobs([...filteredJobs]);
      return;
    } catch (ex) {
      console.log(ex);
    }
  };//end getZips

  const getCities = async ( city, radius ) => {
    return;
  }

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
<<<<<<< HEAD
                if( inputZip ){
                  const zips = getZips( inputZip, 10 );
                  console.log("zips=", zips);
                  /* Next step
                  for( let i = 0; i < zips.length; i++ ) {
                    // filter jobs by zip
                  }*/
                } else {
                  console.log("No Search Location Specified.")
                }
=======
                console.log("locType = ",locType)
                switch (locType) {
                  case ZIPCODE:
                    const zipObjs = getZips( inputLocation, 10 );
                    break;
                  case CITYNAME:
                    const cityObjs = getCities( inputLocation, 10);
                    break;
                  default: console.log("No Search Location Specified.")
                }//end switch
>>>>>>> 1a234ae1b7700d83cf48bd4254cc121c7df71ba7
                setOpenDropdown2(false);
              }//end click
            },
            {
              text: '25 miles',
              click:  ()=>{
                console.log('25mi filter clicked!!!')
                switch (locType) {
                  case ZIPCODE:
                    const zipObjs = getZips( inputLocation, 25 );
                    break;
                  case CITYNAME:
                    const cityObjs = getCities( inputLocation, 25);
                    break;
                  default: console.log("No Search Location Specified.")
                }//end switch
                setOpenDropdown2(false);
              }
            },
            {
              text: '50 miles',
              click:  ()=>{
                console.log('50mi filter clicked!!!')
                switch (locType) {
                  case ZIPCODE:
                    const zipObjs = getZips( inputLocation, 50 );
                    break;
                  case CITYNAME:
                    const cityObjs = getCities( inputLocation, 50);
                    break;
                  default: console.log("No Search Location Specified.")
                }//end switch
                setOpenDropdown2(false);
              }
            },
            {
              text: '75 miles',
              click:  ()=>{
                console.log('75mi filter clicked!!!')
                switch (locType) {
                  case ZIPCODE:
                    const zipObjs = getZips( inputLocation, 75 );
                    break;
                  case CITYNAME:
                    const cityObjs = getCities( inputLocation, 75);
                    break;
                  default: console.log("No Search Location Specified.")
                }//end switch
                setOpenDropdown2(false);
              }
            },
            {
              text: '100 miles',
              click:  ()=>{
                console.log('100mi filter clicked!!!')
                switch (locType) {
                  case ZIPCODE:
                    const zipObjs = getZips( inputLocation, 100 );
                    break;
                  case CITYNAME:
                    const cityObjs = getCities( inputLocation, 100);
                    break;
                  default: console.log("No Search Location Specified.")
                }//end switch
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
