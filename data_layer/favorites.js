const client = require("./client");

// favorite_listings Methods
const createFavorite = async({ listing_id, user_id })=> {
  const SQL = 'INSERT INTO favorites( listing_id, user_id ) VALUES ($1, $2) returning *';
  const response = await client.query(SQL, [listing_id, user_id]);
  return response.rows[0];
};

const readFavorites = async( user_id ) => {
  console.log("In readFavorites, user_id = ", user_id);
  const SQL = 'SELECT * from favorites WHERE user_id = $1';
  const response = await client.query(SQL,[user_id]);
  //console.log(response.rows);
  return (response.rows);
};

const updateFavorite = async( favorite )=> {
  console.log("In updateFavorite, id = ", favorite.id);

  const SQL = 'UPDATE favorites SET listing_id = $1, user_id = $2 WHERE id = $3 returning *';

  const response = await client.query(SQL, [favorite.listing_id, favorite.user_id, favorite.id]);

  return response.rows[0];
};

const deleteFavorite = async( id )=> {
  console.log("In deleteFavorite, id = ", id);
  const SQL = 'DELETE FROM favorites WHERE id = $1';
  return (await client.query(SQL, [id])).rows;
};

const checkForFavorites = async (id) => {
  console.log("In checkForFavorites");
  const sql = 'SELECT * FROM favorites WHERE user_id = $1';
  const data = await client.query(sql, [id]);
  //console.log(data);
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
