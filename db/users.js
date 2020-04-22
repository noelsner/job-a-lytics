const client = require("./client");
const { hash } = require("./auth");

const readUsers = async() => {
  return (await client.query("SELECT * from users")).rows;
};

const createUser = async ({ firstName, lastName, username, password, role }) => {
  const SQL = `INSERT INTO users("firstName", "lastName", username, password, role) values($1, $2, $3, $4, $5) returning *`;
  return (
    await client.query(SQL, [
      firstName,
      lastName,
      username,
      await hash(password),
      role
    ])
  ).rows[0];
};

const updateUser = async({ id, password }) => {
  const SQL = `UPDATE users SET password = $1 WHERE id = $2 returning *`;
  return (await client.query(SQL, [await hash(password), id])).rows[0];
}

const deleteUser = async({ id }) => {
  const SQL = 'DELETE FROM users WHERE id = $1';
  return (await client.query(SQL, [id])).rows;
}

module.exports = {
  createUser,
  readUsers,
  deleteUser,
  updateUser
}
