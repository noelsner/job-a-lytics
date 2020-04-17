const express = require('express');
const router = express.Router();
const path = require('path');
const { createFavorite, readFavorites, updateFavorite, deleteFavorite } = require("../data_layer/index.js");

// Database favorites Create Route

router.post('', (req, res, next)=> {
  const company_name = req.body;
  // console.log("In favorites_routes.js, router.post")
  // console.log(req.body);
  // console.log(req.params);
  createFavorite(listing_id, user_id)
  .then( response => res.send(response) )
  .catch( next )
});

// Database favorites Read Route

router.get('/:id', ( req, res, next) => {
  console.log(req.params.id);
  //res.send("You've made it to favorites, id=", req.params.id);
  readFavorites( req.params.id )
  .then( response => {
    // console.log("response from readFavorites:",response);
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

module.exports = {
  router
}
