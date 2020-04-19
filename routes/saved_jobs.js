const express = require('express');
const router = express.Router();
const { createSavedListing, readSavedListings, updateSavedListing, deleteSavedListing } = require("../db");

// Database saved_jobs Create Route
router.post('', (req, res, next)=> {
  const company = req.body;
  console.log("In router.post")
  console.log(req.body);
  console.log(req.params);
  createSavedListing(listingDate, listingURL, company, location, title, type, contact, companyURL, salary, description)
  .then( response => res.send(response) )
  .catch( next )
});

// Database saved_jobs Read Route
router.get('/:id', (req, res, next)=> {
  readSavedListings( req.params.id )
  .then( response => {
    res.send(response)
  })
  .catch( next )
});

// Database saved_jobs Update Route
router.put('/:id', (req, res, next)=> {
  updateSavedListing({...req.body, id: req.params.id})
  .then( response => res.send(response) )
  .catch( next )
});

// Database saved_jobs Delete Route
router.delete('/:id', (req, res, next)=> {
  deleteSavedListing( req.params.id )
  .then( response => res.send(response) )
  .catch( next )
});

module.exports = { router };
