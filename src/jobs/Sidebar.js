import React, { useState } from 'react';
import DropdownFilter from './DropdownFilter';
import moment from 'moment';
import axios from 'axios';

const Sidebar = ({jobs, setJobs, inputLocation}) => {
  //console.log("In Sidebar, Input Location:", inputLocation);
  console.log("In Sidebar, jobs=", jobs);

  const ZIPCODE = 1;
  const CITYNAME = 2;
  let locType = ZIPCODE; //set default
  const numbers = ['1','2','3','4','5','6','7','8','9','0'];
  // Determine type of input location: city name, or zip
  if( numbers.includes(inputLocation[0]) ){
    console.log("inputLocation is a zip code.")
    locType = ZIPCODE;
  } else {
    locType = CITYNAME;
    //console.log("inputLocation is a city.");
    //split city, state
    const locStr = inputLocation.split(',');
    //console.log("city =", locStr[0], "state=", locStr[1]);
  }

  const [openDropdown1, setOpenDropdown1] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);

  const filterJobs = (zip_codes) => {
    // zip_codes is an array of objects containing:
    // zip_code, distance, city, state
    const cities = [];
    for( let i = 0; i < zip_codes.length; i++ ) {
      // build array of acceptable cities
      if( !cities.includes(zip_codes[i].city) ) {
        // add new city
        cities.push(zip_codes[i].city);
      }
    }
    console.log("(",cities.length,") acceptable cities: ", cities);
    // Filter jobs by cities
    let jobsLocStr = '';
    const filteredJobs = jobs.filter( (job)=> {
      // compare strings
      jobsLocStr = job.location.split(',');
      // jobsLocStr[0] contains city, jobsLocStr[1] contains state
      //console.log("job location = ", jobsLocStr);
      if( cities.includes(jobsLocStr[0])){
        return job;
      }
    });
    //console.log("(",filteredJobs.length,") jobs:", filteredJobs );
    jobs = filteredJobs;
    setJobs([...jobs]);
    return;
  }// end filterJobs

  const getZips = async (locType, zip, radius) => {
    //console.log("In getZips, searchType=", locType, " zip = ", zip, " radius = ", radius);
    try {
      const response = await axios.get(`/api/zipcodes?searchType=${locType}&centerZip=${zip}&radius=${radius}`)
      //console.log("response.data=",response.data)
      console.log("Number of acceptable zip codes = ", response.data.length);
      filterJobs( response.data )
    } catch (ex) {
      console.log(ex);
    }
  };//end getZips

  const getCities = async ( locType, inputLocation, radius ) => {
    //console.log("In getCities: locType=", locType," inputLocation=", inputLocation," radius=", radius);

    const locStr = inputLocation.split(',');  //split city,state
    const city = locStr[0];
    const state = locStr[1].trimStart(); //delete leading blanks
    //console.log("city =", locStr[0], "state=", state);
    try {
      const response = await axios.get(`/api/zipcodes?searchType=${locType}&city=${city}&state=${state}&radius=${radius}`)
      //console.log("In getCities, response=", response);
      console.log("Number of acceptable zip codes = ", response.data.length);
      filterJobs(response.data);
    } catch (ex) {
      console.log(ex);
    }
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
                console.log("locType = ",locType)
                switch (locType) {
                  case ZIPCODE:
                    //console.log("calling getZips, inputLocation=", inputLocation);
                    getZips(locType, inputLocation, 10 );
                    break;
                  case CITYNAME:
                    getCities( locType, inputLocation, 10);
                    break;
                  default: console.log("No Search Location Specified.")
                }//end switch
                setOpenDropdown2(false);
              }//end click
            },
            {
              text: '25 miles',
              click:  ()=>{
                console.log('25mi filter clicked!!!')
                switch (locType) {
                  case ZIPCODE:
                    getZips(locType, inputLocation, 25 );
                    break;
                  case CITYNAME:
                    getCities(locType, inputLocation, 25);
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
                    getZips(locType, inputLocation, 50 );
                    break;
                  case CITYNAME:
                    getCities( locType, inputLocation, 50);
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
                    getZips(locType, inputLocation, 75 );
                    break;
                  case CITYNAME:
                    getCities( locType, inputLocation, 75);
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
                    getZips(locType, inputLocation, 100 );
                    break;
                  case CITYNAME:
                    getCities( locType, inputLocation, 100);
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
