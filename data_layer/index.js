const { createListing, readListings, updateListing, deleteListing } = require("./listings");
const { createUser, readUsers, updateUser, deleteUser } = require("./users");
const { createFavorite, readFavorites, updateFavorite, deleteFavorite } = require("./favorites");

module.exports = {
  createListing, readListings, updateListing, deleteListing,
  createUser, readUsers, updateUser, deleteUser,
  createFavorite, readFavorites, updateFavorite, deleteFavorite,
};
