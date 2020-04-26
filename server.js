const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const favorites = require('./routes/favorites');
const saved_jobs = require('./routes/saved_jobs');
const github_routes = require('./routes/github');
const linkedin_routes = require('./routes/linkedIn');
const zipcodes_routes = require('./routes/zipcodes');
const jwt = require('jwt-simple');
const ejs = require('ejs');

const fs = require('fs');
const https = require('https');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const sockio = require('socket.io');
const authRouter = require('./routes/auth.router');
const passportInit = require('./routes/passport.init');

require('dotenv').config()
const GOOGLE_API_KEY = process.env.GOOGLE_API;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK = 'https://localhost:3000/google/callback'
const CLIENT_ORIGIN = ['https://127.0.0.1:3000', 'https://localhost:3000']
app.engine('html', ejs.renderFile);

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

const certOptions = {
  key: fs.readFileSync(path.resolve('certs/server.key')),
  cert: fs.readFileSync(path.resolve('certs/server.crt'))
}

const server = http.createServer(certOptions, app)

// body parser
app.use(express.json());
app.use(passport.initialize());
passportInit();

app.use(cors({
  origin: CLIENT_ORIGIN
}));

app.use(session({
  secret: 
}))

//routes imported from routes folder
app.use('/api/favorites', favorites.router);
app.use('/api/saved_jobs', saved_jobs.router);
app.use('/api/github', github_routes.router);
app.use('/api/linkedin', linkedin_routes.router);
app.use('/api/zipcodes', zipcodes_routes.router);

app.get('/', (req, res, next)=> res.render(path.join(__dirname, 'index.html'), { GOOGLE_API_KEY }));

//authentication
const isLoggedIn = (req, res, next)=> {
  if(!req.user){
    const error = Error('not authorized');
    error.status = 401;
    return next(error);
  }
  next();
};

const isAdmin = (req, res, next)=> {
  if(req.user.role !== 'ADMIN'){
    return next(Error('not authorized'));
  }
  next();
};

app.use((req, res, next)=> {
  const token = req.headers.authorization;
  if(!token){
    return next();
  }
  db.findUserFromToken(token)
    .then( auth => {
      req.user = auth;
      next();
    })
    .catch(ex => {
      const error = Error('not authorized');
      error.status = 401;
      next(error);
    });
});

app.post('/api/auth', (req, res, next)=> {
  db.authenticate(req.body)
    .then( token => {
      res.send({ token })
    })
    .catch( ()=> {
      const error = Error('not authorized');
      error.status = 401;
      next(error);
    } );
});

app.get('/api/auth', isLoggedIn, (req, res, next) => {
  res.send(req.user);
});

//create user
app.post('/api/users', (req, res, next) => {
  db.createUser({...req.body, role: "USER"})
    .then(user => {
      const token = jwt.encode({ id: user.id }, process.env.JWT);
      delete user.password;
      res.send({user, token})
    })
    .catch(next);
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
