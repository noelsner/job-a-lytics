import React, {useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import fetchJobs from './fetchJobs.js';
import Navbar from './navbar';
import SearchBar from './SearchBar';
import Jobs from './jobs';
import Sidebar from './jobs/Sidebar.js';
import Details from './jobs/Details'
import SavedJobs from './SavedJobs.js';
const API = require('../api');

console.log(API.gitHub.get());

const fakeAPIResponse =
  {  
    "version":2,
    "query":"java",
    "location":"austin, tx",
    "dupefilter":true,
    "highlight":false,
    "radius":25,
    "start":1,
    "end":10,
    "totalResults":547,
    "pageNumber":0,
    "results":[  
      {  
        "jobtitle":"Java Developer",
        "company":"XYZ Corp.,",
        "city":"Austin",
        "state":"TX",
        "country":"US",
        "formattedLocation":"Austin, TX",
        "source":"Dice",
        "date":"Mon, 02 Aug 2017 16:21:00 GMT",
        "snippet":"looking for an object-oriented Java Developer... Java Servlets, HTML, JavaScript, AJAX, Struts, desirable. Familiarity with Tomcat and the Java...",
        "url":"https://www.indeed.com/viewjob?jk=12345&indpubnum=8343699265155203",
        "onmousedown":"indeed_clk(this, '0000');",
        "latitude":30.27127,
        "longitude":-97.74103,
        "jobkey":"12345",
        "sponsored":false,
        "expired":false,
        "indeedApply":true,
        "formattedLocationFull":"Austin, TX",
        "formattedRelativeTime":"11 hours ago"
      }
    ]
  }

const App = ()=> {
  const [jobs, setJobs] = useState([fakeAPIResponse]);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    console.log("In useEffect");
    fetchJobs().then((jobs) => setSavedJobs(jobs));
  }, []);

  console.log("In job_listings App")
  return (
    <div>
      <Navbar />
      <Route path='/' exact>
        <SearchBar />
        <div className='flex flex-row w-full h-screen px-6 mt-12'>
          <div className='w-1/5'>
            <Sidebar jobs={jobs} />
          </div>
          <div className='w-2/5'>
            <Jobs jobs={jobs} />
          </div>
          <div className='w-2/5'>
            <Details jobs={jobs} />
          </div>
        </div>
      </Route>
      <Route path='jobs/saved' exact>
        <SavedJobs />
      </Route>
    </div>
  );
}

export default App;
