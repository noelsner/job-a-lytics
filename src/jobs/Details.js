import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WordCount from './WordCount';

const Details = ({match, jobs}) => {

  console.log('match :', match);
  const id = match.params.id;
  console.log(`Job id is ${id}`);

  const [jobPost, setJobPost] = useState({
      id: "loading",
      company: "loading",
      title: "loading",
      type: "loading",
      location: "loading",
      listingURL: "loading",
      companyURL: "loading",
      postedDate: "loading",
      description: "loading",
      descriptionText: ""
  });

  useEffect( ()=> {
    axios.get(`/api/linkedin/job?id=${id}`)
      .then( (response)=> {
        console.log(response.data);
        setJobPost(response.data);
      })
      .catch( ex => console.log(ex));

    },[]);

    const jobHTML = () => {
      return {__html: jobPost.description};
    };
    
  return(
    <div>
      <div className='h-full text-gray-500 py-6 px-3 flex flex-col md:flex-row'>
        <div className='flex-1 pl-6 pr-12 justify-center max-w-sm sm:max-w-4xl md:max-w-2xl lg:max-w-2xl xl:max-w-3xl '>
          <div className='text-gray-300 text-2xl leading-tight font-bold'>{jobPost.title}</div>
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