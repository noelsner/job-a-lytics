const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const db = require('./data_layer/db');
const favorites = require('./routes/favorites_routes');
const users = require('./routes/users_routes');
const job_listings = require('./routes/job_listings_routes');
const github_routes = require('./routes/github_routes');

// body parser
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

//routes imported from routes folder
app.use('/api/favorites', favorites.router);
app.use('/api/users', users.router);
app.use('/api/job_listings', job_listings.router);
app.use('/api/github', github_routes.router);

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));

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
