const express = require("express");
const app = express();
const path = require("path");
const db = require("./data_layer/index.js");
const jwt = require("jwt-simple");

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(express.json());

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    const error = Error("not authorized");
    error.status = 401;
    return next(error);
  }
  next();
};
/*
const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return next(Error("not authorized"));
  }
  next();
};
*/
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  db.findUserFromToken(token)
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

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.post("/api/auth", (req, res, next) => {
  db.authenticate(req.body)
    .then((token) => res.send({ token }))
    .catch(() => {
      const error = Error("not authorized");
      error.status = 401;
      next(error);
    });
});

app.get("/api/auth", isLoggedIn, (req, res, next) => {
  res.send(req.user);
});

// Create a new user in the database
app.post("/api/users", async (req, res, next) => {
  console.log("In app.post ",req.body)
  try {
    const user = await createUser({ ...req.body });
    /*
    const token = jwt.encode({ id: user.id }, process.env.JWT);
    delete user.password;
    //need the delete for security purposes
    res.send({ user, token });
    */
    res.send({ user });
  } catch (error) {
    next(error);
  }
});

app.put("/api/users/:id", async (req, res, next) => {
  try {
    const user = await updateUser(req.body);
    delete user.password;
    res.send({ user });
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  const error = {
    message: `page not found ${req.url} for ${req.method}`,
    status: 404,
  };
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err.status, err.message);
  res.status(err.status || 500).send({ message: err.message });
});

module.exports = app;
