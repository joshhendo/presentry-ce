import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from './home/Home';
const ipc = require('electron').ipcRenderer;
import * as SlideNavigationHelper from '../helpers/SlideNavigatorHelper';
import { Provider } from 'react-redux';
import { store } from '../data/internal/Store';

export default function App() {
  return (
    <Provider store={store}>
      <Route path="/" exact component={Home} />
    </Provider>
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
