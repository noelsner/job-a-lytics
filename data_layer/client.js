const pg = require("pg");//Postgres library
const client = new pg.Client("postgres://localhost/capstone");

client.connect();

module.exports = {
  client,
};
