import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from './home/Home';
const ipc = require('electron').ipcRenderer;
import * as SlideNavigationHelper from '../helpers/SlideNavigatorHelper';

export default function App() {
  return (
    <div>
      <Route path="/" exact component={Home} />
    </div>
  );
}

ipc.on('keypress', (event: any, message: any) => {
  switch (message) {
    case 'PageDown':
      SlideNavigationHelper.NextSlide();
      break;
    case 'PageUp':
      SlideNavigationHelper.PreviousSlide();
      break;
  }
});
