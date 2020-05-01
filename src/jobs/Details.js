import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WordCount from './WordCount';
import Heart from '../icons/heart';
import { Link, useHistory } from 'react-router-dom';

const Details = ({match, addToFavorites, removeFromFavorites, auth, savedJobs, savedJobSet, setTempJob}) => {

  const history = useHistory();

  const listingId = match.params.id;

  const [jobPost, setJobPost] = useState({
      listingId: "loading",
      company: "loading",
      title: "loading",
      type: "loading",
      location: "loading",
      postedDate: "loading",
      description: "loading",
      companyURL: "loading",
      listingURL: "loading",
      descriptionText: ""
  });

  useEffect( ()=> {
    axios.get(`/api/linkedin/job?id=${listingId}`)
      .then( (response)=> {
        setJobPost(response.data);
      })
      .catch( ex => console.log(ex));

    },[]);

    const jobHTML = () => {
      return {__html: jobPost.description};
    };

    const toggleSaved = (ev) => {
      ev.preventDefault();
      if(auth.id) {
        if(savedJobSet.has(listingId))
          removeFromFavorites(listingId);
        if(!savedJobSet.has(listingId)) {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({'address': location}, function(results, status) {
            if (status === 'OK') {
              const _lat = results[0].geometry.location.lat()
              const _lng = results[0].geometry.location.lng()
              addToFavorites({...job, lat: _lat, lng: _lng})
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        }
        
      } else {
        setTempJob(jobPost);
        history.push('/account/login');
      }
    };
    
  return(
    <div>
      <div className='h-full text-gray-500 py-6 px-3 flex flex-col md:flex-row'>
        <div className='flex-1 pl-6 pr-12 justify-center max-w-sm sm:max-w-4xl md:max-w-2xl lg:max-w-2xl xl:max-w-3xl '>
          <div className='flex justify-between align-middle w-full'>
            <div className='text-gray-300 text-2xl leading-tight font-bold'>{jobPost.title}</div>
            <button onClick={ev => toggleSaved(ev)} className='focus:outline-none focus:text-gray-500'>
              <Heart classes={`fill-current text-gray-${savedJobs.some(j => j.listingId === job.listingId) ? '200' : '700'} w-4 h-4`} />
            </button>
          </div>
          <hr/>
          <div className='text-gray-400 text-lg font-bold mt-2'> {jobPost.company}</div>
          <div className='text-gray-400 text-lg mt-2 mr-3 leading-snug'> {jobPost.location} <span className='text-gray-600 text-md ml-3 text-sm'>Posted {jobPost.postedDate}</span> </div>
          <div className='text-sm mt-3 flex flex-col flex-wrap' dangerouslySetInnerHTML = {jobHTML()}></div>
        </div>
      <div className='flex-1 -mx-50'>
        <div className='text-gray-300 text-lg text-center font-bold mb-4'>Most used skill words in this job</div>
        <WordCount text = {jobPost.descriptionText}/>
      </div>
        
      </div>
    </div>
  );
};

export default Details;