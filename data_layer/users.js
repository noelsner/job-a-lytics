const { client } = require("./client");
const { hash } = require("./auth");

const readUsers = async() => {
  return (await client.query("SELECT * from users")).rows;
};

const createUser = async ({ username, firstName, lastName, password }) => {
  const SQL = `INSERT INTO users(username, "firstName", "lastName", password) values($1, $2, $3, $4) returning *`;
  return (
    await client.query(SQL, [
      username,
      firstName,
      lastName,
      await hash(password),
    ])
  ).rows[0];
};

const updateUser = async({ id, password }) => {
  const SQL = `UPDATE users SET password = $1 WHERE id = $2 returning *`;
  return (await client.query(SQL, [await hash(password), id])).rows[0];
}

const deleteUser = async({ id }) => {
  console.log("In deleteUser, id = ", id);
  const SQL = 'DELETE FROM users WHERE id = $1';
  return (await client.query(SQL, [id])).rows;
}

module.exports = {
  createUser,
  readUsers,
  deleteUser,
  updateUser
}
