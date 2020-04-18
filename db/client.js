const { Client } = require("pg");//Postgres library
const client = new Client(process.env.DATABASE_URL || "postgres://localhost/capstone");

client.connect();

module.exports = client;
