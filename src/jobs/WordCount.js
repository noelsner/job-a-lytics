import React, {useEffect, useState, PureComponent} from 'react';
import parseText from '../../parser/parseText';
import {
    BarChart, Text, Bar, Cell, Label, LabelList, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';


const WordCount = ({text})=> {
    if(text){
        const data = parseText(text);
        const Graph = () => {
            return (
                <ResponsiveContainer width="100%" height= {800} >
                    <BarChart layout= "vertical" barSize = {30} data={data}  margin={{top: 5, right: 20, left: 30, bottom: 5}} padding={{top:0, right: 0, left: 30, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tick={{ fill: '#e2e8f0' }}/>
                        <YAxis width = {0} interval={0} type="category" dataKey="name" tick={{ fill: '#e2e8f0' }} ></YAxis>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d">
                            <LabelList dataKey="name" position="right" style={{ fontSize: '80%', fill: 'white' }} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            );
        };

        return (
            <div className='text-gray-300 w-full'>
                <Graph />    
            </div>
            )
    } else {
        return (<div> Loading Graph </div>);
    }
}

export default WordCount;