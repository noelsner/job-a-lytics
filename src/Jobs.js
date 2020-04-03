import React from "react";

const Jobs = ({ jobs }) => {

  return (
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>
        {job.company_name}
        </li>
      ))}
    </ul>
  );
};

export default Jobs;
