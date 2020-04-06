const express = require('express');
const app = express();
const path = require('path');
const db = require('./data_layer/db');
const { createListing, readListings } = require("./data_layer/index.js");

// body parser
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));

});

// Database Creation Routes
app.post('/api/job_listings', async(req, res, next)=> {
  const company_name = req.body;
  console.log("In server.js, app.post")
  console.log(req.body);
  console.log(req.params);
  createListing(company_name)
  .then( response => res.send(response) )
  .catch( next )
});

//Database Read Routes
app.get('/api/job_listings', async(req, res, next)=> {
  readListings()
  .then( response => res.send(response) )
  .catch( next )
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
    app.listen(port, ()=> { console.log(`listening on port ${port}`) } )
  })
  .catch(console.error);
