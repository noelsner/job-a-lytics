const client = require("./client");

// saved_jobs Methods
const createListing = async({ listingDate, listingURL, company, location, title, type, contact, companyURL, salary, description })=> {

  const SQL = 'INSERT INTO saved_jobs ("listingDate", "listingURL", company, location, title, type, contact, "companyURL", salary, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *';

  const response = await client.query(SQL, [ listingDate, listingURL, company, location, title, type, contact, companyURL, salary, description ]);

  return response.rows[0];
};

const readListings = async() => {
  response = await client.query('SELECT * from saved_jobs');
  return response.rows;
};

const updateListing = async(listing)=> {
  const SQL = 'UPDATE saved_jobs SET "listingDate" = $1, "listingURL" = $2, company = $3, location = $4, title = $5, type = $6, contact = $7, "companyURL" = $8, salary = $9, description = $10 WHERE id = $11 returning *';

  const response = await client.query(SQL, [ listing.listingDate, listing.listingURL, listing.company, listing.location, listing.title, listing.type, listing.contact, listing.companyURL, listing.salary, listing.description, listing.listingId ]);

  return response.rows[0];
}

const deleteListing = async(id)=> {
  const SQL = 'DELETE FROM saved_jobs WHERE id = $1';
  return (await client.query(SQL, [id])).rows;
};

module.exports = {
  createListing,
  readListings,
  updateListing,
  deleteListing
};
