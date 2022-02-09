// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

import Framework7React from 'framework7-react';
import Framework7 from './framework7-custom';

import '../css/framework7-custom.less';
import 'framework7-icons/css/framework7-icons.css';
import '../css/app.less';

import App from '../components/App';
import AppDetails from '../pages/AppDetails';

Framework7.use(Framework7React);

// Mount React App
ReactDOM.render(
  React.createElement(AppDetails),
  document.getElementById('appdetails'),
);
