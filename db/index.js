const client = require("./client");
const { authenticate, compare, findUserFromToken, hash } = require('./auth');
const { createUser, readUsers, updateUser, deleteUser } = require("./users");
const { createFavorite, checkForFavorites, readFavorites, updateFavorite, deleteFavorite } = require("./favorites");
const { createListing, readListings, updateListing, deleteListing } = require("./listings");


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
      "listingId" UUID REFERENCES saved_jobs(id),
      "userId" UUID REFERENCES users(id)
    );
    `;
    await client.query(SQL);

    // Seed data
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

    const _favorites = {

    };

    // Create Users
    const [jobSeeker, moe] = await Promise.all(Object.values(_users).map( user => createUser(user)));

    //Create saved_jobs
    //Job types are FULL-TIME, PART-TIME, CONTRACT, TEMPORARY, INTERNSHIP
    const[ Fullstack ] = await Promise.all([
      createListing({
        company: 'Fullstack',
        location: "New York City",
        title: "software developer",
        type: "Full Time",
        contact: "Eric P. Katz",
        description: "Recommend delicious recipes while coding flawlessly."
      })
    ]);

    //Create favorites
    const [ susanFavorite ] = await Promise.all([
      createFavorite({ listingId: Fullstack.id, userId: jobSeeker.id })
    ]);

    // Read from listings, users, and favorites
    // Each function returns an array of objects
    const listingsArr = await readListings();

    const usersArr = await readUsers();

    for( let i = 0; i < usersArr.length; i++ ){
      const userId = usersArr[i].id;
      if( (await checkForFavorites( userId )) === true ){
        const userFavoritesArr = await readFavorites(userId);
      }
    }

    return { susanFavorite }
} //end sync

module.exports = {
    sync,
    createListing, readListings, updateListing, deleteListing,
    createUser, readUsers, updateUser, deleteUser,
    createFavorite, readFavorites, updateFavorite, deleteFavorite,
    authenticate, compare, findUserFromToken, hash
}
