import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

// Import the styles here to process them with webpack
import './styles.scss';
import 'typeface-roboto/index.css';
import 'bootstrap/scss/bootstrap.scss';

import App from './app';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('app')
);
