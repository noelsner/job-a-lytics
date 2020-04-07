const express = require('express');
const app = express();
const path = require('path');
const db = require('./data_layer/db');
const { createListing, readListings, updateListing, deleteListing } = require("./data_layer/index.js");

// body parser
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));

});

// Database job_listing Create Route
app.post('/api/job_listings', async(req, res, next)=> {
  const company_name = req.body;
  console.log("In server.js, app.post")
  console.log(req.body);
  console.log(req.params);
  createListing(listing_date, listing_url, company_name, location, job_title, job_type, contact, company_url, annual_salary, job_description)
  .then( response => res.send(response) )
  .catch( next )
});

// Database job_listings Read Route
app.get('/api/job_listings', async(req, res, next)=> {
  readListings()
  .then( response => res.send(response) )
  .catch( next )
});

// Database job_listings Update Route
app.put('/api/job_listings/:id', async(req, res, next)=> {
  updateListing({...req.body, id: req.params.id})
  .then( response => res.send(response) )
  .catch( next )
});

// Database job_listings Delete Route
app.delete('/api/job_listings/:id', async(req, res, next)=> {
  deleteListing( req.params.id )
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
