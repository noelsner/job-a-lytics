import React, {useEffect, useState} from 'react';
import parseText from '../../parser/parseText';

const WordCount = ({text})=> {

    //const [topTen, setTopTen] = useState([['Graph','Count']]);

    const topTen = parseText(text);
    console.log(topTen);
    

    return (
        <div style={{color: "white"}}>
            Graph of where word count should be
            {
                topTen.map( (pair, idx) => {
                    return ( 
                        <div key = {idx}> 
                            {pair[0]} : {pair[1]}
                        </div>
                    );
                })
            }
        </div>
    )
}

export default WordCount;