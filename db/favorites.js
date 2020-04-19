const client = require("./client");

// favorite_listings Methods
const createFavorite = async({ savedJobId, userId })=> {
  const SQL = 'INSERT INTO favorites( "savedJobId", "userId" ) VALUES ($1, $2) returning *';
  const response = await client.query(SQL, [savedJobId, userId]);
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
