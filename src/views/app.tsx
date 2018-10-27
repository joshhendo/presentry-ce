import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from './home/Home';
const ipc = require('electron').ipcRenderer;
import * as SlideNavigationHelper from '../helpers/SlideNavigatorHelper';
import { Provider } from 'react-redux';
import { store } from '../data/internal/Store';
import Settings from './settings/Settings';
import Menu from './menu/Menu';
import AddPassage from '../plugins/bible-gateway/views/AddPassage';

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Menu />
        <main id="page-wrap">
          <Route path="/" exact component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/add/passage" component={AddPassage} />
        </main>
      </div>
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
