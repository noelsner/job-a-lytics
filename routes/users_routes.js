const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../data_layer/index.js");
const jwt = require("jwt-simple");
const { authenticate, compare, findUserFromToken, hash } = require('../data_layer/auth');

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    const error = Error("not authorized");
    error.status = 401;
    return next(error);
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return next(Error("not authorized"));
  }
  next();
};

router.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  findUserFromToken(token)
    .then((auth) => {
      req.user = auth;
      next();
    })
    .catch((ex) => {
      const error = Error("not authorized");
      error.status = 401;
      next(error);
    });
});

router.post('/auth', (req, res, next)=> {
  authenticate(req.body)
    .then( token => res.send({ token }))
    .catch( ()=> {
      const error = Error('not authorized');
      error.status = 401;
      next(error);
    } );
});

router.get("/auth", isLoggedIn, (req, res, next) => {
  res.send(req.user);
});

// Create a new user in the database
router.post("", async (req, res, next) => {
  try {
    const user = await createUser({ ...req.body });
    const token = jwt.encode({ id: user.id }, process.env.JWT);
    delete user.password;
    //need the delete for security purposes
    res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const user = await updateUser(req.body);
    delete user.password;
    res.send({ user });
  } catch (error) {
    next(error);
  }
});

router.use((req, res, next) => {
  const error = {
    message: `page not found ${req.url} for ${req.method}`,
    status: 404,
  };
  next(error);
});

router.use((err, req, res, next) => {
  console.log(err.status, err.message);
  res.status(err.status || 500).send({ message: err.message });
});

module.exports = {router};
