const express = require('express');
const app = express();
const path = require('path');
const { createFavorite, readFavorites, updateFavorite, deleteFavorite } = require("./data_layer/index.js");

// body parser
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));

});

// Database favorites Create Route

app.post('/api/favorites', async(req, res, next)=> {
  const company_name = req.body;
  console.log("In favorites_routes.js, app.post")
  console.log(req.body);
  console.log(req.params);
  createFavorite(listing_id, user_id)
  .then( response => res.send(response) )
  .catch( next )
});

// Database favorites Read Route
// TODO: pass user id into readFavorites
app.get('/api/favorites', async(req, res, next)=> {
  readFavorites()
  .then( response => res.send(response) )
  .catch( next )
});

// Database favorites Update Route
app.put('/api/favorites/:id', async(req, res, next)=> {
  updateFavorite({...req.body, id: req.params.id})
  .then( response => res.send(response) )
  .catch( next )
});

// Database favorites Delete Route
app.delete('/api/favorites/:id', async(req, res, next)=> {
  deleteFavorite( req.params.id )
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
