const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');

// body parser
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));

});

// Database Creation Routes
app.post('/api/job_listings', async(req, res, next)=> {
  const company_name = req.body;
  db.create_job_listing(company_name)
  .then( response => res.send(response) )
  .catch( next )
});

//Database Read Routes
app.get('/api/job_listings', async(req, res, next)=> {
  db.read_job_listings()
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

// UI connection

const port = process.env.PORT || 3000;

db.sync()
  .then(()=> {
    app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
  });
});
