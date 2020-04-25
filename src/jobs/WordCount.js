import React, {useEffect, useState, PureComponent} from 'react';
import parseText from '../../parser/parseText';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';


const WordCount = ({text})=> {
    if(text){
        const data = parseText(text);
        const Graph = () => {
            return (
                <BarChart width={500} height={500} layout= "vertical" barSize = {15} data={data}  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number"/>
                    <YAxis type="category" dataKey="name"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
            );
        };

        return (
            <div style={{color: "white"}}>
                <Graph />    
            </div>
            )
    } else {
        return (<div> Loading Graph </div>);
    }
}

export default WordCount;