import React, { useParams } from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchBar from './SearchBar';
import JobResults from './JobResults';
import Sidebar from './Sidebar.js';
import Details from './Details';

// let { id } = useParams();
// console.log('id :', id);

const Jobs = ({jobs, setJobs}) => {
  return (
    <Switch>
      <Route>
        <SearchBar setJobs = {setJobs}/>
        <div className='flex flex-col md:flex-row w-full h-screen px-6 mt-8 md:mt-12'>
          <div className='md:w-32 px-3 md:pl-0 mb-6 md:mb-0'>
            <Sidebar jobs={jobs} />
          </div>
          <div className=''>
            <JobResults jobs={jobs} />
          </div>
        </div>
      </Route>
      <Route path='jobs/:id' children={<Details jobs={jobs}/>} />
    </Switch>
  );
};

export default Jobs;