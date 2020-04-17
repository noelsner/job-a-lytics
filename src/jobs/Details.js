import React, { useState, useParams } from 'react';

const Details = (jobs = {jobs}) => {

  let params = useParams()
  console.log('params :', params);

  const [jobPost, setJobPost] = useState({
    id: "e9e632a7-c756-40c9-b1ca-c3eb5c7f9ce3",
      type: "Full Time",
      url: "https://jobs.github.com/positions/e9e632a7-c756-40c9-b1ca-c3eb5c7f9ce3",
      created_at: "Sat Aug 03 00:50:23 UTC 2019",
      company: "Game Closure",
      company_url: "http://gameclosure.com",
      location: "USA",
      title: "Title",
      description: `<p>GAME CLOSURE</p>\n
                    <p>San Francisco, Mountain View, Tokyo, Remote  -  
                    Full Time</p>\n<p>Game Closure is on the hunt for  
                    Senior Game Engineers to help us build the social 
                    games that will be tomorrow’s biggest hits on Facebook`
  })

  return(
    <div className='bg-gray-800 h-full text-gray-600 px-3'>
      <h1>{jobPost.title}</h1>
      <h2> {jobPost.created_at}</h2>
      
      <h2 dangerouslySetInnerHTML={{__html: jobPost.description}}></h2>
    </div>
  );
};

export default Details;