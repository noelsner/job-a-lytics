const client = require("./client");
const { authenticate, compare, findUserFromToken, hash } = require('./auth');
const { createUser, readUsers, updateUser, deleteUser } = require("./users");
const { createFavorite, checkForFavorites, readFavorites, updateFavorite, deleteFavorite } = require("./favorites");
const { createSavedListing, readSavedListings, updateSavedListing, deleteSavedListing } = require("./listings");


const sync = async() => {

  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS favorites;
    DROP TABLE IF EXISTS saved_jobs;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "firstName" VARCHAR(100) NOT NULL,
      "lastName" VARCHAR(100) NOT NULL,
      username VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      CHECK (char_length(username) > 0),
      CHECK (char_length("firstName") > 0),
      role VARCHAR(20) DEFAULT 'USER'
    );

    CREATE TABLE saved_jobs(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "listingId" VARCHAR(50) NOT NULL,
      company VARCHAR(50) NOT NULL,
      title VARCHAR(50) NOT NULL,
      type VARCHAR(20) DEFAULT 'Full Time',
      location VARCHAR(50) NOT NULL,
      "postedDate" TIMESTAMP default CURRENT_TIMESTAMP,
      "listingDate" VARCHAR(50),
      contact VARCHAR(100),
      salary VARCHAR(50),
      description TEXT,
      "companyURL" VARCHAR(100),
      "listingURL" VARCHAR(100),
      CHECK (length(company) > 0)
    );

    CREATE TABLE favorites(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      date TIMESTAMP default CURRENT_TIMESTAMP,
      "savedJobId" UUID REFERENCES saved_jobs(id),
      "userId" UUID REFERENCES users(id)
    );
    `;
    await client.query(SQL);

    // Create Users
    const _users = {
      jobSeeker: {
        firstName: "Susan",
        lastName: "Johnson",
        username: "jobSeeker",
        password: "simple",
        role: "ADMIN"
      },
      moe: {
        username: "moe",
        firstName: "Moe",
        lastName: "Stooge",
        password: "MOE",
        role: null
      }
    };
    const [jobSeeker, moe] = await Promise.all(Object.values(_users).map( user => createUser(user)));

    //Create saved_jobs
    const _savedJobs = {
      fullstack: {
        listingId: "04b95b9d-5877-4e35-9d54-9ee28f1a38f7",
        company: "Fullstack Academy",
        title: "Full-Stack Engineer",
        type: "Full Time",
        location: "New York City",
        contact: "Eric P. Katz",
        description: "Recommend delicious recipes while coding flawlessly.",
      },
      job1: {
        listingId: "1234567891234567",
        company: "Acme Developers",
        title: "Full-Stack Engineer",
        type: "Part Time",
        location: "Remote",
        postedDate: "Thu Mar 19 17:57:51 UTC 2020",
        description: "You will work to create a capstone project of your choosing.",
      }
    };
    const [fullstack, job1] = await Promise.all(Object.values(_savedJobs).map( job => createSavedListing(job)));
    
    //Create favorites
    const _favorites = {
      fav1: {
        savedJobId: fullstack.id,
        userId: jobSeeker.id
      },
      fav2: {
        savedJobId: job1.id,
        userId: jobSeeker.id
      },
      fav3: {
        savedJobId: fullstack.id,
        userId: moe.id
      },
      fav4: {
        savedJobId: job1.id,
        userId: moe.id
      }
    }
    const [fav1, fav2, fav3, fav4] = await Promise.all(Object.values(_favorites).map( favorite => {
      createFavorite(favorite);
    }));

} //end sync

module.exports = {
    sync,
    createSavedListing, readSavedListings, updateSavedListing, deleteSavedListing,
    createUser, readUsers, updateUser, deleteUser,
    createFavorite, readFavorites, updateFavorite, deleteFavorite,
    authenticate, compare, findUserFromToken, hash
}
