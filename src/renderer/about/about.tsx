import * as React from 'react';
import { Link } from 'react-router-dom';

export default class About extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>You are about!</h1>
        <Link to="/">Go Home</Link>
      </div>
    );
  }
}
