import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>You are home</h1>
        <Link to="/about">About</Link>
      </div>
    );
  }
}
