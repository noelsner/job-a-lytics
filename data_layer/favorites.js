const client = require("./client");

// favorite_listings Methods
const createFavorite = async({ listing_id, user_id })=> {
  const SQL = 'INSERT INTO favorites( listing_id, user_id ) VALUES ($1, $2) returning *';
  const response = await client.query(SQL, [listing_id, user_id]);
  return response.rows[0];
};

const readFavorites = async( user_id ) => {
  console.log("In readFavorites, user_id = ", user_id);
  return( await client.query('SELECT * from favorites WHERE user_id = $1'),[user_id]).rows;
};

const updateFavorite = async( user_id )=> {
  console.log("In updateFavorite");
};

const deleteFavorite = async( user_id )=> {
  console.log("In deleteFavorite");
};

const checkForFavorites = async (id) => {
  const sql = 'SELECT * FROM favorites WHERE user_id = $1';
  const data = client.query(sql, [id]);
  if ( data.length === 0 ) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  createFavorite,
  readFavorites,
  updateFavorite,
  deleteFavorite,
  checkForFavorites
}
