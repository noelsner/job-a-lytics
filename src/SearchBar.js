import React, {useState} from 'react';
import axios from 'axios';

const SearchBar = ({setJobs}) => {
  const [inputQuery, setInputQuery] = useState(' ');
  const [inputLocation, setInputLocation] = useState(' ');

  const onSubmit = (ev) => {
    ev.preventDefault();
    axios.get(`/api/github/description=${inputQuery}&location=${inputLocation}`)
      .then( response => setJobs(response.data))
      .catch(ex => console.log(ex))
  };

  return (
    <form className='my-6' onSubmit={onSubmit}>
      <div className='flex'>
        <div className='flex flex-col w-full md:flex-row'>
          <div className='flex-1 pl-3 md:pl-6 pr-3'>
            <label className='block tracking-wide text-gray-400 text-md font-bold mb-1 px-1' htmlFor='what'>What</label>
            <input value={inputQuery} onChange={ev => setInputQuery(ev.target.value)} className='appearance-none block w-full bg-gray-400 text-gray-600 placeholder-gray-700 border border-gray-400 rounded-md py-1 px-2 focus:outline-none focus:bg-gray-200' id='what' type='text' placeholder='Job title, keywords, or company'></input>
          </div>
          <div className='flex-1 px-3'>
            <label className='block tracking-wide text-gray-400 text-md font-bold mb-1 px-1' htmlFor='where'>Where</label>
            <input value={inputLocation} onChange={ev => setInputLocation(ev.target.value)} className='appearance-none block w-full bg-gray-400 text-gray-600 placeholder-gray-700 border border-gray-400 rounded-md py-1 px-2 focus:outline-none focus:bg-gray-200' id='where' type='text' placeholder='City,state, or zip code'></input>
          </div>
          <button className='bg-pink-700 text-gray-200 font-bold rounded-md px-6 py-1 ml-3 mr-3 md:mr-6 mt-6 hover:bg-pink-800 focus:outline-none focus:bg-pink-800'>Search</button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;