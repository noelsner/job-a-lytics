const axios = require('axios');
const express = require('express');
const router = express.Router();
APIkey = 'CCfGLRhnGaQZ4YqoTFOIX8A8ocJJueJa4CCydPNskRstjsyjD07mAwBNeTm5PiUA'

const getZipsWithinRadius = async ( centerZip, distance ) => {
  try {
    const URL = `https://www.zipcodeapi.com/rest/${APIkey}/radius.json/${centerZip}/${distance}/mile`;

    console.log("In getZipsWithinRadius, URL:",URL);
    const response = await axios.get(URL);
    const zipObjsArray = response.data.zip_codes;
    console.log("There are (",zipObjsArray.length,") zipcodes within ", distance," miles.");
    return zipObjsArray;
  } catch (error) {
    console.error( "in getZipsWithinRadius",error.message );
  }
}

const getZipsFromCity = async ( city, state ) => {
  try {
    // remove any leading spaces in state
    const urlState = state.trimStart();
    const URL = `https://www.zipcodeapi.com/rest/${APIkey}/city-zips.json/${city}/${urlState}`
    console.log(URL);
    const response = await axios.get(URL);
    const zipArray = response.data.zip_codes;
    console.log("zipcodes within ", city," are:",zipArray);
    return zipArray;
  } catch (error) {
    console.error( "in getZipsFromCity",error.message );
  }
}

router.get('', (req, res, next) => {
  const { searchType, city, state, centerZip, radius } = req.query;
  console.log("searchType=", searchType, "city=", city, "state=", state, "centerZip=", centerZip,"radius=",radius);
  const ZIPCODE = '1';
  const CITYNAME = '2';
  switch (searchType) {
    case ZIPCODE:
      console.log("searchType is", ZIPCODE);
      getZipsWithinRadius(centerZip, radius)
      .then ( zipObjs => {
        //console.log(zipObjs)
        res.send(zipObjs) })
      .catch( ex => {
        res.send(ex);
        next;
      })
      break;
    case CITYNAME:
      const cityZipsArray = [];
      getZipsFromCity(city, state)
      .then ( cityZipsArray => {
        //console.log("In router: cityZipsArray:", cityZipsArray)
        const zipObjsWithinRadius = [];
        const acceptableZips =[];
        for(let i = 0; i < cityZipsArray.length; i++ ) {
          let cityZipObj = { zip_code: cityZipsArray[i], city: `${city}`, state:`${state}`};
          zipObjsWithinRadius.push(cityZipObj);
          acceptableZips.push(cityZipsArray[i]);

        }//end for loop through city zips
        console.log("(",zipObjsWithinRadius.length,") zipObjsWithinRadius")
        res.send(zipObjsWithinRadius)
      })//end .then
      .catch( ex => {
        res.send(ex);
        next;
      })

      /* Loop through all the zip codes for user specified city
      // and find the zipcodes within the user specified radius
      for( let i=0; i < cityZipsArray.length; i++){
        getZipsWithinRadius( cityZipsArray[i], radius)
        .then ( response => {
          console.log("In router: response", response);
          /*
          console.log("eliminate duplicates");
          for( let j = 0; j < response.zip_codes.length; j++) {
            //console.log(response.zip_codes[j].zip_code);
            if( !acceptableZips.includes(response.zip_codes[j].zip_code)) {
              // add acceptable zipcode object
              zipObjsWithinRadius.push(response.zip_codes[j]);
              acceptableZips.push(response.zip_codes[j].zip_code);
            }
          }
          console.log("(",acceptableZips.length,") zips");
        })// end .then
        .catch( ex => {
          res.send(ex);
          next;
        })
      }//end for*/

      // >>>  Send resulting zip Objects to UI  <<<
      //res.send(zipObjsWithinRadius);
      break;
    default: res.send("Search type not specified.")
  }//end switch
});

module.exports = {
  router
}
