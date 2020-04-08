const { client } = require("./client");
const { createListing } = require("./index");
const { createUser } = require("./users");

const sync = async() => {

  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS favorite_listings;
    DROP TABLE IF EXISTS job_listings;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS roles;

    CREATE TABLE roles(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title VARCHAR(20) NOT NULL,
      CHECK (char_length(title) > 0)
    );

    CREATE TABLE users(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(100) NOT NULL UNIQUE,
      "firstName" VARCHAR(100) NOT NULL,
      "lastName" VARCHAR(100) NOT NULL,
      password VARCHAR(100),
      CHECK (char_length(username) > 0),
      CHECK (char_length("firstName") > 0),
      role_id UUID REFERENCES roles(id)
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

    CREATE TABLE favorite_listings(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      date TIMESTAMP default CURRENT_TIMESTAMP,
      listing_id UUID REFERENCES job_listings(id),
      user_id UUID REFERENCES users(id)
    );
    `

    await client.query(SQL);

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
                    lastName: "Johnson"})
    ]);

} //end sync

module.exports = {
    sync,
}
