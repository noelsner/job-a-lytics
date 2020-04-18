const client = require("./client");

// favorite_listings Methods
const createFavorite = async({ listingId, userId })=> {
  const SQL = 'INSERT INTO favorites( "listingId", "userId" ) VALUES ($1, $2) returning *';
  const response = await client.query(SQL, [listingId, userId]);
  return response.rows[0];
};

const readFavorites = async() => {
  const SQL = 'SELECT * from favorites';
  const response = await client.query(SQL,[]);
  return (response.rows);
};

const updateFavorite = async( favorite )=> {
  const SQL = 'UPDATE favorites SET "listingId" = $1, "userId" = $2 WHERE id = $3 returning *';

  const response = await client.query(SQL, [favorite.listingId, favorite.userId, favorite.id]);

  return response.rows[0];
};

const deleteFavorite = async( id )=> {
  const SQL = 'DELETE FROM favorites WHERE id = $1';
  return (await client.query(SQL, [id])).rows;
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
