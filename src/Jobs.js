import React from "react";

const Jobs = ({ jobs }) => {

  return (
    <div>
      <header>
       <h1>Job Listings ({jobs.length})</h1>
      </header>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
          {job.company_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;
