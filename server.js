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
const axios = require('axios');
const qs = require('qs');

require('dotenv').config()
const { GOOGLE_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_REDIRECT, GOOGLE_SECRET, GITHUB_CLIENT_ID, GITHUB_SECRET, LINKEDIN_CLIENT_ID, LINKEDIN_SECRET, LINKEDIN_REDIRECT } = process.env;
app.engine('html', ejs.renderFile);

// console.log(zipcodes_routes);

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

//linkedin oauth
app.get('/api/auth/linkedin', (req, res, next)=> {
  const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${LINKEDIN_REDIRECT}&state=wmQ7F78pEsExqVG6GGihQrK7&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
  res.redirect(url);
});
app.get('/api/auth/linkedin/callback', (req, res, next)=> {
  const _url = 'https://www.linkedin.com/oauth/v2/accessToken';
  const payload = {
    grant_type: 'authorization_code', 
    code: req.query.code,
    redirect_uri: LINKEDIN_REDIRECT, 
    client_id: LINKEDIN_CLIENT_ID,
    client_secret: LINKEDIN_SECRET 
  }
  axios({
    method: 'post',
    url: _url,
    data: qs.stringify({
      grant_type: 'authorization_code', 
      code: req.query.code,
      redirect_uri: LINKEDIN_REDIRECT, 
      client_id: LINKEDIN_CLIENT_ID,
      client_secret: LINKEDIN_SECRET 
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
    .then( response => {
      console.log('response1:', response.data);
      return axios.get('https://api.linkedin.com/v2/me', {
        headers: {
          authorization: `Bearer ${response.data.access_token}`
        }
      });
    })
    .then( response => {
      console.log('response2:', response.data);
      const first = response.data.localizedFirstName;
      const last = response.data.localizedLastName;
      return db.authenticateWithLinkedin({
        username: `${first} ${last}`,
        name: `${first} ${last}`,
        googleId: response.data.id,
        picture: response.data.profilePicture.displayImage
      })
    })
    .then( token => {
      res.send(`
        <script>
          window.localStorage.setItem('token', '${token}');
          window.location = '/';
        </script>
      `);
    })
    .catch(next);
});

//google oauth
app.get('/api/auth/google', (req, res, next)=> {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=email&response_type=code&redirect_uri=${GOOGLE_REDIRECT}&client_id=${GOOGLE_CLIENT_ID}`;
  res.redirect(url);
});
app.get('/api/auth/google/callback', (req, res, next)=> {
  const url = 'https://oauth2.googleapis.com/token';
  const payload = {
    code: req.query.code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_SECRET, 
    redirect_uri: GOOGLE_REDIRECT, 
    grant_type: 'authorization_code' 
  }
  axios.post(url, payload)
    .then( response => {
      console.log(response.data);
      return axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          authorization: `Bearer ${response.data.access_token}`
        }
      });
    })
    .then( response => {
      console.log(response.data);
      return db.authenticateWithGoogle({
        username: response.data.email,
        name: 'moe',
        googleId: response.data.id,
        picture: response.data.picture
      })
    })
    .then( token => {
      res.send(`
        <script>
          window.localStorage.setItem('token', '${token}');
          window.location = '/';
        </script>
      `);
    })
    .catch(next);
});

//github oauth
app.get('/api/auth/github', (req, res, next) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`);
});

app.get('/github/callback', (req, res, next) => {
  const url = 'https://github.com/login/oauth/access_token';
  const payload = {
    code: req.query.code,
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_SECRET 
  }
  axios.post(url, payload)
    .then( response => {
      const { access_token } = qs.parse(response.data);
      if(access_token) {
        axios.get('https://api.github.com/user', {
          headers: {
            Authorization: `token ${access_token}`
          }
        })
        .then( response => {
          console.log('response :>> ', response);
          return db.authenticateWithGithub({
            username: response.data.login,
            name: response.data.name,
            githubId: response.data.id,
            picture: response.data.avatar_url
          })
        })
        .then( token => {
          res.send(`
            <script>
              window.localStorage.setItem('token', '${token}');
              window.location = '/';
            </script>
          `);
        })
        .catch(next);
      }
    })
});


// body parser
app.use(express.json());

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
  console.log('req.body :>> ', req.body);
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
