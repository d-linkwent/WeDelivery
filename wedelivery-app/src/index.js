import React from 'react';

import ReactDOM from 'react-dom';

import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

import App from './App';
import './index.css';
import * as servicePackage from './servicePackage';

const firebaseConfig = {
  apiKey: 'AIzaSyBrX8oRRbPtt72toeQX0yLnj-So-GPxEOI',
  authDomain: 'in45-362709.firebaseapp.com',
  projectId: 'in45-362709',
  storageBucket: 'in45-362709.appspot.com',
  messagingSenderId: '365656374200',
  appId: '1:365656374200:web:d5f00bf3c81b1188106d4d',
  measurementId: 'G-HQJGD8FEFQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(<App />, document.getElementById('root'));

servicePackage.unregister();
