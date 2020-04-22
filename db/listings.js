const client = require("./client");

// saved_jobs Methods
const createSavedListing = async({ listingId, company, title, type, location, postedDate, listingDate, contact, salary, description, companyURL, listingURL })=> {

  const SQL = 'INSERT INTO saved_jobs ("listingId", company, title, type, location, "postedDate", "listingDate", contact, salary, description, "companyURL", "listingURL") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *';

  const response = await client.query(SQL, [ listingId, company, title, type, location, postedDate, listingDate, contact, salary, description, companyURL, listingURL ]);

  return response.rows[0];
};

const readSavedListings = async(userId) => {
  response = await client.query('SELECT * FROM favorites JOIN saved_jobs ON favorites."savedJobId" = saved_jobs.id WHERE favorites."userId" = $1', [userId]);
  return response.rows;
};

const updateSavedListing = async(listing)=> {
  const SQL = 'UPDATE saved_jobs SET "listingDate" = $1, "listingURL" = $2, company = $3, location = $4, title = $5, type = $6, contact = $7, "companyURL" = $8, salary = $9, description = $10 WHERE id = $11 returning *';

  const response = await client.query(SQL, [ listing.listingDate, listing.listingURL, listing.company, listing.location, listing.title, listing.type, listing.contact, listing.companyURL, listing.salary, listing.description, listing.listingId ]);

  return response.rows[0];
}

const deleteSavedListing = async(id)=> {
  const SQL = 'DELETE FROM saved_jobs WHERE id = $1';
  return (await client.query(SQL, [id])).rows;
};

module.exports = {
  createSavedListing,
  readSavedListings,
  updateSavedListing,
  deleteSavedListing
};
