import * as React from 'react';
import { Routes, Route } from 'react-router';
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add/passage" element={<AddPassage />} />
          </Routes>
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
