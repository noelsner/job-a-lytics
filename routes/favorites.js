const express = require('express');
const router = express.Router();
const { createFavorite, readFavorites, updateFavorite, deleteFavorite } = require("../db/index.js");

// Database favorites Create Route
router.post('/:id', (req, res, next)=> {
  const { savedJobId, listingId } = req.body;
  createFavorite({userId: req.params.id, savedJobId, listingId})
  .then( response => res.send(response) )
  .catch( next )
});

// Database favorites Read Route
router.get('/:id', ( req, res, next) => {
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
  const {listingId} = req.body;
  deleteFavorite({ userId: req.params.id, listingId })
  .then( response => res.send(response) )
  .catch( next )
});

module.exports = {
  router
}
