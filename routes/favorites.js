const express = require('express');
const router = express.Router();
const { createFavorite, readFavorites, updateFavorite, deleteFavorite } = require("../db/index.js");

// Database favorites Create Route
router.post('/:id', (req, res, next)=> {
  console.log('req.params.id :', req.params.id);
  console.log('req.body :', req.body);
  const {savedJobId} = req.body;
  createFavorite({userId: req.params.id, savedJobId})
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
  deleteFavorite( req.params.id )
  .then( response => res.send(response) )
  .catch( next )
});

module.exports = {
  router
}
