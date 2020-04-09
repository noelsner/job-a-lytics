const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const db = require('./data_layer/db');

// body parser
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));

});

// Data retrieval routes
app.get('/api/github', (req, res, next) => {

  console.log("initiating Axios call to GitHub");
  axios.get('https://jobs.github.com/positions.json?description=react&page=1')
    .then( response => {
      res.send(response.data);
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
  .then(()=> { app.listen(port, ()=> {
                          console.log(`listening on port ${port}`)
                        })
  })
  .catch();

