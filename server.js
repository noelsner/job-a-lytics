const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const db = require('./data_layer/db');
const favorites = require('./favorites_routes');

console.log(router);

// body parser
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/api/favorites', favorites.router);

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));

});



app.get('/api/github/description=:inputQuery&location=:inputLocation', (req, res, next) => { 
  
  console.log("***** server.js Initiating Axios call to GitHub *****");
  console.log("Recieved parameters: ");
  console.log(req.params);
  const { inputQuery, inputLocation } = req.params; 
  console.log(inputQuery);
  console.log(inputLocation);
  
  const url = `https://jobs.github.com/positions.json?description=${inputQuery}&location=${inputLocation}`;
  axios.get(url)
    .then( response => {
      res.send(response.data);
    })
    .catch( ex => {
      res.send(ex);
      next;
  })
  
})

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
    app.listen(port, ()=> {console.log(`listening on port ${port}`)
    });
  });
