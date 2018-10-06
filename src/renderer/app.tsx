import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from './home/home';
import About from './about/about';

export default function App() {
  return (
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
}
