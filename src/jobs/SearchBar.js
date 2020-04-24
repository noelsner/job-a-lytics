import React, { useState, useEffect} from 'react';
import axios from 'axios';

const SearchBar = ({setJobs, inputQuery, setInputQuery, inputLocation, setInputLocation, setLoading }) => {

  const [city, setCity] = useState('');
  const [myState, setMyState] = useState('');
  const [zip, setZip] = useState('');

  if(zip) {
    setInputLocation(zip);
  }
  if (city && myState) {
    setInputLocation(`${city}, ${myState}`);
  }

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    axios.get(`/api/linkedin/?description=${inputQuery}&location=${inputLocation}`)
      .then( response => {
        setJobs(response.data);
      })
      .catch(ex => console.log(ex))
      .finally(() => {
        setLoading(false);
        setInputLocation('')
      })
  };

  let input;
  useEffect(() => {
    initAutocomplete(input);
  }, []);

  let autocomplete;

  var componentForm = {
    // street_number: 'short_name',
    // route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    // country: 'long_name',
    postal_code: 'short_name'
  };


  function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {types: ['geocode']});

    autocomplete.setFields(['address_component']);
  
    autocomplete.addListener('place_changed', fillInAddress);
  }



  function fillInAddress() {
    var place = autocomplete.getPlace().address_components;
  
    // Get each component of the address from the place details, and then fill-in the corresponding state.
    for (var i = 0; i < place.length; i++) {
      var addressType = place[i].types[0];
      if (addressType === 'locality') {
        var val = place[i][componentForm[addressType]];
        setCity(val);
      }
      if (addressType === 'postal_code') {
        var val = place[i][componentForm[addressType]];
        setZip(val);
      }
      if (addressType === 'administrative_area_level_1') {
        var val = place[i][componentForm[addressType]];
        setMyState(val);
      }
    }
  }

  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,

        };
        console.log(geolocation)
        var circle = new google.maps.Circle(
            {center: geolocation, radius: position.coords.accuracy});
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }


  return (
    <form className='my-6 mx-6 md:mx-0' onSubmit={onSubmit}>
      <div className='flex'>
        <div className='flex flex-col w-full md:flex-row'>
          <div className='flex-1 pl-3 md:pl-6 pr-3'>
            <label className='block tracking-wide text-gray-400 text-md font-bold mb-1 px-1' htmlFor='what'>What</label>
            <input value={inputQuery} onChange={ev => setInputQuery(ev.target.value)} className='appearance-none block w-full bg-gray-400 text-gray-600 placeholder-gray-700 border border-gray-400 rounded-md py-1 px-2 focus:outline-none focus:bg-gray-200' id='what' type='text' placeholder='Job title, keywords, or company'></input>
          </div>
          <div className='flex-1 px-3'>
            <label className='block tracking-wide text-gray-400 text-md font-bold mb-1 px-1' htmlFor='autocomplete'>Where</label>
            <input value={inputLocation} onChange={ev => setInputLocation(ev.target.value)} className='appearance-none block w-full bg-gray-400 text-gray-600 placeholder-gray-700 border border-gray-400 rounded-md py-1 px-2 focus:outline-none focus:bg-gray-200' type='text' placeholder='City,state, or zip code' id='autocomplete' ref={el => input=el} onFocus={geolocate}></input>
          </div>
          <button className='bg-pink-700 text-gray-200 font-bold rounded-md px-6 py-1 ml-3 mr-3 md:mr-6 mt-6 hover:bg-pink-800 focus:outline-none focus:bg-pink-800'>Search</button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
