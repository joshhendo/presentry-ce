import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

// Import the styles here to process them with webpack
import './styles.scss';
import 'typeface-roboto/index.css';
import 'bootstrap/scss/bootstrap.scss';

import App from './app';

const container = document.getElementById('app');

if (container) {
    const root = createRoot(container);
    root.render(
      <HashRouter>
          <App />
      </HashRouter>
    );
} else {
    console.error("Couldn't find the app element to mount to!");
}
