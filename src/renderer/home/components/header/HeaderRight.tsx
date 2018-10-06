import * as React from 'react';

import './HeaderRight.scss';

export default class HeaderRight extends React.Component {
  render() {
    return (
      <div className="header-right-container">
        this is the right most container
        {this.props.children}
      </div>
    );
  }
}
