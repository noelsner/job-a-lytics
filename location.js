/*  The Goal

We wish to have our user type in a location, either by name, zip code, or by lat/long.

Use Radio Buttons in your search form to specifiy name, zip code, or lat/long.

*/

//Setup initial screen objects
// Location type selector
let locationType = document.querySelector("#locationType");
var locType = 1;
locationType.addEventListener('click', function(event) {
  //Read location radio button
  locType = event.target.value;
  console.log("Location type is:",locType);
})
// "Location" input
const inputLocation = document.querySelector('input[name="location"]');

queryObj = {
  locationName: '',
  zipCode: '',
  latitude: '',
  longitude: ''
}

// "Results" output
const resultsEl = document.querySelector('#main-content');
let outputObj = {
  location: '',
  forcastObj: []
};

async function getData(location) {
  console.log('Location:', location);
  // validate location data
  if( !location ) {
    resultsEl.innerHTML = "Invalid Location";
    return null;
  }
  const cityAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=0cbdf65f217c07539831e5a8ecefa78b`

  const zipAPI = `https://api.openweathermap.org/data/2.5/forecast?zip=${location},us&APPID=0cbdf65f217c07539831e5a8ecefa78b`

  const latLongAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=33.8358&lon=-118.3407&APPID=0cbdf65f217c07539831e5a8ecefa78b`

  let weatherAPI = latLongAPI;

  console.log("Location type is:", locType);
  console.log(typeof(locType));
  switch (locType) {
    case '1': weatherAPI = cityAPI; break;
    case '2': weatherAPI = zipAPI; break;
    case '3': weatherAPI = latLongAPI; break;
    default: weatherAPI = latLongAPI;
  }
  console.log(weatherAPI);
  try {
    const response = await fetch(weatherAPI);
    const data = await response.json();
    console.log(data);
    outputObj.location = location;
    let html = `<h2>${outputObj.location}:</h2>`;
    for( i = 0; i < data.list.length; i++) {

    }
    console.log(html)
    return outputObj;
  } catch (ex) {
    console.log(ex);
  }
}

async function locationSelected(event) {
  console.log("locationSelected");
    event.preventDefault();
    outputObj = await getData( inputLocation.value );
}

function mapSelectedEvent() {
}

//main
// "Submit button"
let buttonEl = document.querySelector('.btn-submit');
buttonEl.addEventListener('click', locationSelected);

