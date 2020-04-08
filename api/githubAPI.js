const axios = require('axios')
const url = 'https://jobs.github.com/positions.json'

const get = (desc) =>{
    //return '%c GitHub Axios function will run here';
    console.log('%c *** GitHub Axios call initiated ***', 'color: green');
    //axios.get(`https://jobs.github.com/positions.json?description=angular&page=1`)
    //.then(res => console.log(res.data))
    //.catch(ex => console.log(ex));

};
    
module.exports = {get}