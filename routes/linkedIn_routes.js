const express = require('express');
const router = express.Router();
const scrapeQuery = require('../api/linkedInQueryScraper');

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

module.exports = {
    router
  }