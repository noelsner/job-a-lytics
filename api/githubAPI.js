const axios = require('axios')
const url = 'placeholder'

const get = () =>{
    let data = [];
    console.log('%c *** GitHub Axios call initiated ***', 'color: green');
    /*
    axios.get(`/api/github`)
    .then( response => { 
    console.log('%c *** GitHub Axios call finished ***', 'color: red' )
    console.log(response);
    
    });  
    return data;*/
};
    
module.exports = { get };