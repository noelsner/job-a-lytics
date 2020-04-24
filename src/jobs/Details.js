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
      description: "loading"
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
    <div className='h-full text-gray-600 p-3'>
      <h1>{jobPost.title}</h1>
      <hr/>
      <h2> {jobPost.company}</h2>
      <br/>
      <h2> {jobPost.location}</h2>
      <h2> {jobPost.postedDate}</h2>
      <WordCount text = {jobPost.description}/>
      <br/>
      <h2 dangerouslySetInnerHTML = {jobHTML()}></h2>
    </div>
  );
};

export default Details;