import React, { useEffect, useState } from 'react';

const Map = ({ savedJobs, userLocation }) => {
  // console.log(savedJobs)
  const [map, setMyMap] = useState({});
  let el;

  useEffect(
    () => {
      const bounds = new google.maps.LatLngBounds();
      const geocoder = new google.maps.Geocoder();

      savedJobs.forEach(job => {
        if(job.lat && job.lng) {
          const marker = new google.maps.Marker({position: {lat: job.lat * 1, lng: job.lng * 1}, map: map});
          bounds.extend({lat: job.lat * 1, lng: job.lng * 1});
        }
      });

      if (map.fitBounds) {
        map.fitBounds(bounds);
      };
    },
    [savedJobs, map]
  );

  useEffect(
    () => {
      const _map = new google.maps.Map(
        el, {zoom: 7, center: {lat: 37.39484160000001, lng: -121.86419199999999}}
      );
      setMyMap(_map);
    },
    []
  );

  return (
    <div>
      {/* <div className='text-gray-600 text-xl'>MAP</div> */}
      <div id='map' ref={ref => el = ref}></div>
    </div>
  )
};

export default Map;