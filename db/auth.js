const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const client = require("./client");

const findUserFromToken = async(token)=> {
  const id = jwt.decode(token, process.env.JWT).id;
  const user = (await client.query('SELECT * FROM users WHERE id = $1', [id])).rows[0];
  delete user.password;
  delete user.linkedinId;
  delete user.googleId;
  delete user.githubId;
  return user;
};

const hash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashed) => {
      if (err) {
        return reject(err);
      }
      return resolve(hashed);
    });
  });
};

const compare = ({ plain, hashed }) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plain, hashed, (err, verified) => {
      if (err) {
        return reject(err);
      }
      if (verified) {
        return resolve();
      }
      reject(Error("bad credentials"));
    });
  });
};

const authenticate = async ({ username, password }) => {
  const user = (await client.query("SELECT * FROM users WHERE username=$1", [username])).rows[0];
  await compare({ plain: password, hashed: user.password });
  return jwt.encode({ id: user.id }, process.env.JWT);
};

const authenticateWithGithub = async({ username, name, githubId, picture}) => {
  let rows = (await client.query('SELECT * FROM users WHERE "githubId"=$1', [githubId])).rows;
  if(rows.length) {
    return jwt.encode({ id: rows[0].id }, process.env.JWT);
  } else {
    rows = (await client.query('INSERT INTO users (username, name, "githubId", picture) values($1, $2, $3, $4) returning *', [username, name, githubId, picture])).rows;
    return jwt.encode({ id: rows[0].id }, process.env.JWT);
  }
}

const authenticateWithGoogle = async({ username, name, googleId, picture}) => {
  let rows = (await client.query('SELECT * FROM users WHERE "googleId"=$1', [googleId])).rows;
  if(rows.length) {
    return jwt.encode({ id: rows[0].id }, process.env.JWT);
  } else {
    rows = (await client.query('INSERT INTO users (username, name, "googleId", picture) values($1, $2, $3, $4) returning *', [username, name, googleId, picture])).rows;
    return jwt.encode({ id: rows[0].id }, process.env.JWT);
  }
}

const authenticateWithLinkedin = async({ username, name, linkedinId, picture}) => {
  let rows = (await client.query('SELECT * FROM users WHERE "linkedinId"=$1', [linkedinId])).rows;
  if(rows.length) {
    return jwt.encode({ id: rows[0].id }, process.env.JWT);
  } else {
    rows = (await client.query('INSERT INTO users (username, name, "linkedinId", picture) values($1, $2, $3, $4) returning *', [username, name, linkedinId, picture])).rows;
    return jwt.encode({ id: rows[0].id }, process.env.JWT);
  }
}

module.exports = {
  findUserFromToken,
  authenticate,
  compare,
  hash,
  authenticateWithGithub,
  authenticateWithGoogle,
  authenticateWithLinkedin
};
