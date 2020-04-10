const { client } = require("./client");
const { createListing } = require("./index");
const { createUser } = require("./users");
const { createFavorite } = require("./favorites");

const sync = async() => {

  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS favorites;
    DROP TABLE IF EXISTS job_listings;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(100) NOT NULL UNIQUE,
      "firstName" VARCHAR(100) NOT NULL,
      "lastName" VARCHAR(100) NOT NULL,
      password VARCHAR(100),
      CHECK (char_length(username) > 0),
      CHECK (char_length("firstName") > 0),
      role VARCHAR(20)
    );

    CREATE TABLE job_listings(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      posted_date TIMESTAMP default CURRENT_TIMESTAMP,
      listing_date VARCHAR(50),
      listing_url VARCHAR(100),
      job_type VARCHAR(20) DEFAULT 'FULL-TIME',
      company_name VARCHAR(50) NOT NULL,
      CHECK (length(company_name) > 0),
      location VARCHAR(50) NOT NULL,
      job_title VARCHAR(50) NOT NULL,
      contact VARCHAR(100) NOT NULL,
      company_url VARCHAR(100),
      annual_salary VARCHAR(50),
      job_description TEXT
    );

    CREATE TABLE favorites(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      date TIMESTAMP default CURRENT_TIMESTAMP,
      listing_id UUID REFERENCES job_listings(id),
      user_id UUID REFERENCES users(id)
    );
    `
console.log("calling client.query")
    await client.query(SQL);
console.log("returned from client.query")
    // Seed data

    //Job types are FULL-TIME, PART-TIME, CONTRACT, TEMPORARY, INTERNSHIP
    const[ Fullstack ] = await Promise.all([
      createListing({company_name: 'Fullstack',
                              location: "New York City",
                              job_title: "software developer",
                              job_type: "FULL-TIME",
                              contact: "Eric P. Katz",
                            job_description: "Recommend delicious recipes while coding flawlessly." })
    ]);

    const[ jobSeeker ] = await Promise.all([
      createUser({username: "jobSeeker",
                    firstName: "Susan",
                    lastName: "Johnson",
                    password: "simple"})
    ]);
    const [ susanFavorite ] = await Promise.all([
      createFavorite({ listing_id: Fullstack.id, user_id: jobSeeker.id })
    ]);

    return { susanFavorite }
} //end sync

module.exports = {
    sync,
}
