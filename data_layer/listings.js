const client = require("./client");

// job_listings Methods
const createListing = async({ listing_date, listing_url, company_name, location, job_title, job_type, contact, company_url, annual_salary, job_description })=> {

  const SQL = 'INSERT INTO job_listings (listing_date, listing_url, company_name, location, job_title, job_type, contact, company_url, annual_salary, job_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *';

  const response = await client.query(SQL, [ listing_date, listing_url, company_name, location, job_title, job_type, contact, company_url, annual_salary, job_description ]);

  return response.rows[0];
};

const readListings = async() => {
  // console.log("In readListings");
  response = await client.query('SELECT * from job_listings');
  // console.log(response.rows);
  return response.rows;
};

const updateListing = async(listing)=> {
  // console.log("In updateListing, listing = ", listing);

  const SQL = 'UPDATE job_listings SET listing_date = $1, listing_url = $2, company_name = $3, location = $4, job_title = $5, job_type = $6, contact = $7, company_url = $8, annual_salary = $9, job_description = $10 WHERE id = $11 returning *';

  const response = await client.query(SQL, [ listing.listing_date, listing.listing_url, listing.company_name, listing.location, listing.job_title, listing.job_type, listing.contact, listing.company_url, listing.annual_salary, listing.job_description ]);

  return response.rows[0];
}

const deleteListing = async(id)=> {
  console.log("In deleteListing, id = ", id);
  const SQL = 'DELETE FROM job_listings WHERE id = $1';
  return (await client.query(SQL, [id])).rows;
};

module.exports = {
  createListing,
  readListings,
  updateListing,
  deleteListing
};
