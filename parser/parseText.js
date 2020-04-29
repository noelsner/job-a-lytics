const skillWords = require('./skillWords');

const parseText = (text) => {

  const hashArray = skillWords.reduce( (acc, word) => {
    const regex = new RegExp(` ${word}`,'gi');
    const count = (text.match(regex) || []).length;
    if(count > 0) {
      acc.push({'name': word,'count': count });
    }
    return acc;
  },[]);

  const sorted = hashArray.sort(function(a, b) {
      return b.count - a.count;
  });

  return sorted.slice(0,20);

};

module.exports = parseText;