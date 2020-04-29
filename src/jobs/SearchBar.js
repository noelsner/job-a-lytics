import React, { useState, useEffect} from 'react';
import axios from 'axios';

const SearchBar = ({setJobs, inputQuery, setInputQuery, inputLocation, setInputLocation, setLoading, setSearchResults }) => {

  const [city, setCity] = useState('');
  const [myState, setMyState] = useState('');
  const [zip, setZip] = useState('');

  // console.log('city :>> ', city);
  // console.log('myState :>> ', myState);
  // console.log('inputLocation :>> ', inputLocation);

  if(zip) {
    setInputLocation(zip);
    setZip('');
  }
  if (city && myState) {
    // document.getElementById('autocomplete').value = `${city}, ${myState}`;
    setInputLocation(`${city}, ${myState}`);
    setCity('');
    setMyState('');
  }

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    axios.get(`/api/linkedin/?description=${inputQuery}&location=${inputLocation}`)
      .then( response => {
        setJobs(response.data);
        setSearchResults({ inputQuery, inputLocation });
      })
      .catch(ex => console.log(ex))
      .finally(() => {
        setLoading(false);
        // setInputLocation('')
      })
  };

  let input;
  useEffect(() => {
    initAutocomplete(input);
  }, []);

  let autocomplete;

  const geocoder = new google.maps.Geocoder;

  const componentForm = {
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

  // Get each component of the address from the place details, and then fill-in the corresponding state.
  const fillLocationStates = (place) => {
    // let _city = '';
    // let _state = '';
    for (let i = 0; i < place.length; i++) {
      const addressType = place[i].types[0];
      if (addressType === 'locality') {
        // _city = (place[i][componentForm[addressType]]);
        setCity(place[i][componentForm[addressType]]);
      }
      if (addressType === 'postal_code') {
        setZip(place[i][componentForm[addressType]]);
      }
      if (addressType === 'administrative_area_level_1') {
        // _state = (place[i][componentForm[addressType]]);
        setMyState(place[i][componentForm[addressType]]);
      }
    }
    // setInputLocation((`${_city}, ${_state}`)
  }

  const fillInAddress = () => {
    const place = autocomplete.getPlace().address_components;
    fillLocationStates(place);
  }

  const geolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,

        };
        console.log(geolocation)
        geocoder.geocode({'location': geolocation}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              console.log('results : ', results[0])
              const place = results[0].address_components;
              fillLocationStates(place);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      });
    }
  }

  useEffect(
    () => {
      geolocate();
    },
    []
  )


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
            <input value={inputLocation} onChange={ev => setInputLocation(ev.target.value)} className='appearance-none block w-full bg-gray-400 text-gray-600 placeholder-gray-700 border border-gray-400 rounded-md py-1 px-2 focus:outline-none focus:bg-gray-200' type='text' placeholder='City,state, or zip code' id='autocomplete' ref={el => input = el}></input>
          </div>
          <button className='bg-pink-700 text-gray-200 font-bold rounded-md px-6 py-1 ml-3 mr-3 md:mr-6 mt-6 hover:bg-pink-800 focus:outline-none focus:bg-pink-800'>Search</button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
