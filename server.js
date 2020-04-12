const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const db = require('./data_layer/db');
const favorites = require('./routes/favorites_routes');
const users = require('./routes/users_routes');
const job_listings = require('./routes/job_listings_routes');
const github_routes = require('./routes/github_routes');
const dl = require('./data_layer');
const jwt = require('jwt-simple');

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// body parser
app.use(express.json());

//authentication
const isLoggedIn = (req, res, next)=> {
  if(!req.user){
    const error = Error('not authorized 1');
    error.status = 401;
    return next(error);
  }
  next();
};

const isAdmin = (req, res, next)=> {
  if(req.user.role !== 'ADMIN'){
    return next(Error('not authorized 2'));
  }
  next();
};

app.use((req, res, next)=> {
  const token = req.headers.authorization;
  if(!token){
    return next();
  }
  console.log('token (app.use route in server.js) :', token);
  dl.findUserFromToken(token)
    .then( auth => {
      req.user = auth;
      console.log('req.user :', req.user);
      next();
    })
    .catch(ex => {
      const error = Error('not authorized 3');
      error.status = 401;
      next(error);
    });
});

//create user
app.post('/api/users', (req, res, next) => {
  dl.createUser(req.body)
    .then(user => {
      const token = jwt.encode({ id: user.id }, process.env.JWT);
      delete user.password;
      res.send({user, token})
    })
    .catch(next);
});

//routes imported from routes folder
app.use('/api/favorites', favorites.router);
// app.use('/api/users', users.router);
app.use('/api/job_listings', job_listings.router);
app.use('/api/github', github_routes.router);


app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//authenticate user
app.post('/api/auth', (req, res, next)=> {
  dl.authenticate(req.body)
    .then( token => {
      res.send({ token })
      console.log('token (auth POST):', token);
    })
    .catch( ()=> {
      const error = Error('not authorized 4');
      error.status = 401;
      next(error);
    } );
});

app.get('/api/auth', isLoggedIn, (req, res, next) => {
  res.send(req.user);
});

// Error handlers
app.use((req, res, next)=> {
  next({
    status: 404,
    message: `Page not found for ${req.method} ${req.url}`
  })
});

app.use((err, req, next)=> {
  res.status(err.status || 500).send({
    message: err.message || JSON.stringify(err)
  });
});

// UI connection

const port = process.env.PORT || 3000;

db.sync()
  .then(()=> {
    app.listen(port, ()=> {console.log(`listening on port ${port}`)
    });
  });
