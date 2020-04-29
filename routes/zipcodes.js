const axios = require('axios');
const express = require('express');
const router = express.Router();
APIkey = 'CCfGLRhnGaQZ4YqoTFOIX8A8ocJJueJa4CCydPNskRstjsyjD07mAwBNeTm5PiUA'

const getZipsWithinRadius = async ( centerZip, distance ) => {
  try {
    const URL = `https://www.zipcodeapi.com/rest/${APIkey}/radius.json/${centerZip}/${distance}/mile`;

    console.log(URL);
    const response = await axios.get(URL);
    const zipArray = response.data;
    console.log("zipcodes within ", distance," are:",zipArray);
    return zipArray;
  } catch (error) {
    console.error( "in getZips",error.message );
  }
}

const getZipsFromCity = async ( city, state ) => {
  try {
    const URL = `https://www.zipcodeapi.com/rest/${APIkey}/city-zips.json/${city}/${state}`
    console.log(URL);
    const response = await axios.get(URL);
    const zipArray = response.data;
    console.log("zipcodes within ", city," are:",zipArray);
    return zipArray;
  } catch (error) {
    console.error( "in getZips",error.message );
  }
}

router.get('', (req, res, next) => {
  //res.send("In zipcodes.js");
  const { centerZip, radius } = req.query;
  console.log("centerZip=", centerZip,"radius=",radius);

  getZipsWithinRadius(centerZip, radius)
  .then ( zips => {
    console.log(zips)
    res.send(zips) })
  .catch( ex => {
    res.send(ex);
    next;
  })
});

module.exports = {
  router
}
