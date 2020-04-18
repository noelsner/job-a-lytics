const express = require('express');
const router = express.Router();
const scrapeQuery = require('../api/linkedInQueryScraper');
const scrapeJob = require('../api/linkedInJobScraper');

router.get('/', (req, res, next) => { 
    console.log("***** server.js Initiating LinkedIn call to Puppeteer *****");
    console.log("Recieved query parameters: ");
    console.log(req.query);
    const { description, location } = req.query;

    scrapeQuery( description, location )
      .then( list => {
        res.send(list);
      })
      .catch( ex => {
        res.send(ex);
        next;
    })  
  })

router.get('/job', (req, res, next) => { 
  console.log(req.query);
  const { id } = req.query;
  scrapeJob(id)
    .then( (details) => {
      //console.log(details);
      res.send(details);
    } )
    .catch( ex => res.send('Error'))

})



module.exports = {
    router
  }