import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from './home/Home';

export default function App() {
  return (
    <div>
      <Route path="/" exact component={Home} />
    </div>
  );
}
