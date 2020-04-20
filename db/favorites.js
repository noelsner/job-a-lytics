const client = require("./client");

// favorite_listings Methods
const createFavorite = async({ savedJobId, userId, listingId })=> {
  const SQL = 'INSERT INTO favorites( "savedJobId", "userId", "listingId" ) VALUES ($1, $2, $3) returning *';
  const response = await client.query(SQL, [savedJobId, userId, listingId]);
  return response.rows[0];
};

const readFavorites = async(userId) => {
  const SQL = 'SELECT * from favorites WHERE "userId" = $1';
  const response = await client.query(SQL,[userId]);
  return (response.rows);
};

const updateFavorite = async( favorite )=> {
  const SQL = 'UPDATE favorites SET "savedJobId" = $1, "userId" = $2 WHERE id = $3 returning *';

  const response = await client.query(SQL, [favorite.savedJobId, favorite.userId, favorite.id]);

  return response.rows[0];
};

const deleteFavorite = async({userId, listingId })=> {
  const SQL = 'DELETE FROM favorites WHERE "listingId" = $1 AND "userId" = $2';
  return (await client.query(SQL, [listingId, userId])).rows;
};

const checkForFavorites = async (id) => {
  const sql = 'SELECT * FROM favorites WHERE "userId" = $1';
  const data = await client.query(sql, [id]);
  if ( data.rows.length === 0 ) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  createFavorite,
  readFavorites,
  updateFavorite,
  deleteFavorite,
  checkForFavorites
}
