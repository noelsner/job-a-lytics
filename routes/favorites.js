const express = require('express');
const router = express.Router();
const { createFavorite, readFavorites, updateFavorite, deleteFavorite } = require("../db/index.js");

// Database favorites Create Route
router.post('', (req, res, next)=> {
  const company = req.body;
  createFavorite(listingId, userId)
  .then( response => res.send(response) )
  .catch( next )
});

// Database favorites Read Route
router.get('/:id', ( req, res, next) => {
  console.log(req.params.id);
  readFavorites( req.params.id )
  .then( response => {
    res.send(response)
  })
  .catch( next )
});

// Database favorites Update Route
router.put('/:id', (req, res, next)=> {
  updateFavorite({...req.body, id: req.params.id})
  .then( response => res.send(response) )
  .catch( next )
});

// Database favorites Delete Route
router.delete('/:id', (req, res, next)=> {
  deleteFavorite( req.params.id )
  .then( response => res.send(response) )
  .catch( next )
});

module.exports = {
  router
}
