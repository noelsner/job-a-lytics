import React from 'react';
import { render } from 'react-dom';
import App from './App.js';
import { HashRouter as Router } from 'react-router-dom';

const root = document.querySelector('#root');
render(<Router> <App /> </Router>, root);
