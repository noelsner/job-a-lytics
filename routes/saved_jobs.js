const express = require('express');
const router = express.Router();
const { createListing, readListings, updateListing, deleteListing } = require("../db");

// Database saved_jobs Create Route
router.post('', (req, res, next)=> {
  const company = req.body;
  console.log("In router.post")
  console.log(req.body);
  console.log(req.params);
  createListing(listingDate, listingURL, company, location, title, type, contact, companyURL, salary, description)
  .then( response => res.send(response) )
  .catch( next )
});

// Database saved_jobs Read Route
router.get('', (req, res, next)=> {
  readListings()
  .then( response => {
    console.log("response from readListings = ", response);
    res.send(response)
  })
  .catch( next )
});

// Database saved_jobs Update Route
router.put('/:id', (req, res, next)=> {
  updateListing({...req.body, id: req.params.id})
  .then( response => res.send(response) )
  .catch( next )
});

// Database saved_jobs Delete Route
router.delete('/:id', (req, res, next)=> {
  deleteListing( req.params.id )
  .then( response => res.send(response) )
  .catch( next )
});

module.exports = { router };
