const pg = require('pg'); //Postgres library
const client = new pg.Client(process.env.DATABASE_URL || 'postgres:localhost/capstone');
client.connect();

const sync = async() => {

  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS job_listings;

    CREATE TABLE job_listings(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      posted_date TIMESTAMP default CURRENT_TIMESTAMP,
      company_name VARCHAR(100) NOT NULL,
      CHECK (length(company_name) > 0),
      location VARCHAR(100) NOT NULL,
      job_title VARCHAR(100) NOT NULL,
      contact VARCHAR(100) NOT NULL,
      job_description VARCHAR(500)
    );
    `
    await client.query(SQL);

    // Seed data
    const _job = {
      company_name: "Fullstack",
      location: "New York City",
      job_title: "software developer",
      contact: "Eric P. Katz",
      job_description:"Recommend delicious recipes while coding flawlessly."
    }

    const[ Fullstack ] = await Promise.all([
      create_job_listing({company_name: 'Fullstack',
                              location: "New York City",
                              job_title: "software developer",contact: "Eric P. Katz" })
    ]);
} //end sync

// job_listings Methods
const create_job_listing = async({ company_name, location, job_title, contact })=> {
  const SQL = 'INSERT INTO job_listings( company_name, location, job_title, contact ) VALUES ($1, $2, $3, $4) returning *';
  const response = await client.query(SQL, [company_name, location, job_title, contact]);
  return response.rows;
};

const read_job_listings = async() => {
  console.log("In read_job_listings");
  return( await client.query('SELECT * from job_listings')).rows;
};

sync()
  .then(() => {
    console.log("job_listings table has been created.");
  })
  .catch(console.error);

module.exports = {
    sync,
    create_job_listing,
    read_job_listings
}
