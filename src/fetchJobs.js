import React from 'react';
import axios from "axios";

const fetchJobs = async() => {
  console.log("In fetchJobs")
  try {
    const response = await axios.get(`/api/job_listings`);
    console.log(response.data);
    return response.data;
  } catch(error) {
    console.error(error);
  }
};

export default fetchJobs;
