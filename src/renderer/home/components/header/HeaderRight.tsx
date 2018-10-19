import * as React from 'react';

import './HeaderRight.scss';
import * as commander from '../../../../presenter/commander';

export default class HeaderRight extends React.Component {
  launchPresentation = () => {
    commander.LaunchPresentation();
  };

  render() {
    return (
      <div className="header-right-container">
        <button onClick={this.launchPresentation}>Launch Presentation</button>
      </div>
    );
  }
}
