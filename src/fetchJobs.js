import axios from "axios";

const URL = 'https://jobs.github.com/positions.json?description=ruby&page=1';

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
