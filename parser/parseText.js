const uselessWords = require('./uselessWords');
const skillWords = require('./skillWords');

const isInsignificant = (word) => { 
    return uselessWords.includes(word);
}

const isSkill = (word) => { 
    return skillWords.includes(word);
}

const parseText = (text) => {

  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  const cleaned = text.replace(regex ," ")
  const parsed = cleaned.split(" ");

  const hashTable = {};

  parsed.forEach( word => {
    if(hashTable[word]){
      hashTable[word]++;
    } else {
      hashTable[word] = 1;
    }
  });

  const sortArray = [];
    for (let word in hashTable) {
      if(isSkill(word.toLowerCase())){
        sortArray.push([word.toLowerCase(), hashTable[word]]);
      }
    }

  const sorted = sortArray.sort(function(a, b) {
      return b[1] - a[1];
  });

  const sortedObject = sorted.slice(0,20).map( pair => {
    return {
      name: pair[0],
      count: pair[1]
    } 
  })

  return sortedObject;

};
//Test Line
//console.log(parseText('There is React development some a the a the'))

module.exports = parseText;
