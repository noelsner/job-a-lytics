const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res, next) => { 
  
    console.log("***** server.js Initiating Axios call to GitHub *****");
    console.log("Recieved query parameters: ");
    console.log(req.query);
    const { description, location } = req.query;

    const url = `https://jobs.github.com/positions.json?description=${description}&location=${location}`;
    axios.get(url)
      .then( response => {
        res.send(response.data);
      })
      .catch( ex => {
        res.send(ex);
        next;
    })
    
  })

module.exports = {
    router
  }