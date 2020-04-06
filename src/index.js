import React from 'react';
import {render} from 'react-dom';
import App from './App.js';
import { HashRouter } from 'react-router-dom';

const root = document.querySelector('#root');
console.log("connected");
render(<HashRouter> <App /> </HashRouter>, root);
