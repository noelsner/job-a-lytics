import React from 'react';
import axios from "axios";

const fetchJobs = async() => {
  console.log("In fetchJobs")
  try {
    const response = await axios.get(`/api/saved_jobs`);
    console.log(response.data);
    return response.data;
  } catch(error) {
    console.error(error);
  }
};

export default fetchJobs;
