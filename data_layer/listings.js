const { client } = require("./client");

// job_listings Methods
const createListing = async({ listing_date, listing_url, company_name, location, job_title, job_type, contact, company_url, annual_salary, job_description })=> {
  const SQL = 'INSERT INTO job_listings (listing_date, listing_url, company_name, location, job_title, job_type, contact, company_url, annual_salary, job_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *';
  const response = await client.query(SQL, [ listing_date, listing_url, company_name, location, job_title, job_type, contact, company_url, annual_salary, job_description ]);
  return response.rows[0];
};

const readListings = async() => {
  console.log("In read_job_listings");
  return( await client.query('SELECT * from job_listings')).rows;
};

const updateListing = async()=> {
  console.log("In updateListing");
};

const deleteListing = async()=> {
  console.log("In deleteListing");
};

module.exports = {
  createListing,
  readListings,
  updateListing,
  deleteListing
};
