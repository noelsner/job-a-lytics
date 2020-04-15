const express = require('express');
const router = express.Router();
const path = require('path');
const { createListing, readListings, updateListing, deleteListing } = require("../data_layer/index.js");

// Database job_listing Create Route

router.post('', (req, res, next)=> {
  const company_name = req.body;
  console.log("In router.post")
  console.log(req.body);
  console.log(req.params);
  createListing(listing_date, listing_url, company_name, location, job_title, job_type, contact, company_url, annual_salary, job_description)
  .then( response => res.send(response) )
  .catch( next )
});

// Database job_listings Read Route
router.get('', (req, res, next)=> {
  res.send("You made it to job_listings get route")
  readListings()
  .then( response => {
    console.log("response from readListings = ", response);
    res.send(response)
  })
  .catch( next )
});

// Database job_listings Update Route
router.put('/:id', (req, res, next)=> {
  updateListing({...req.body, id: req.params.id})
  .then( response => res.send(response) )
  .catch( next )
});

// Database job_listings Delete Route
router.delete('/:id', (req, res, next)=> {
  deleteListing( req.params.id )
  .then( response => res.send(response) )
  .catch( next )
});

// Error handlers
router.use((req, res, next)=> {
  next({
    status: 404,
    message: `Page not found for ${req.method} ${req.url}`
  })
});

router.use((err, req, next)=> {
  res.status(err.status || 500).send({
    message: err.message || JSON.stringify(err)
  });
});

module.exports = { router };
