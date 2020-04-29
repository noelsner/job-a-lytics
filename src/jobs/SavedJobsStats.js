import React, {useEffect, useState} from 'react';
import axios from 'axios';
import WordCount from './WordCount';

const SavedJobsStats = ({savedJobs} ) => {
     
    const [jobText, setJobText] = useState('web developer');
    const [showGraph, setShowGraph] = useState(false)

    const runStats = ()=> {
        Promise.all(savedJobs.map(job => axios.get(`/api/linkedin/job?id=${job.listingId}`)))
        .then( response => {
            const textArray = response.map(job => job.data.descriptionText)
            setJobText(textArray.join());
            setShowGraph(true);
        })
        .catch( ex => console.log(ex))
        };

    return (
        <div className='bg-gray-800 text-gray-600 mt-6 rounded-lg p-4'>
            <button style={{color: "white"}} onClick = {()=> runStats() }> Run Word Analysis</button>
            <h1>Count of skill words for your Saved Jobs</h1>
            {showGraph && <WordCount text = {jobText} />}
        </div>
    );
};

export default SavedJobsStats;