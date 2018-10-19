import * as React from 'react';

import './HeaderRight.scss';
import * as commander from '../../../../presenter/commander';

export default class HeaderRight extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const that = this;

    this.state = {
      presentationActive: false,
    };

    commander.commanderEmitter.addListener('active', function(active) {
      that.setState({
        presentationActive: active,
      });
    })
  }

  launchPresentation = () => {
    commander.LaunchPresentation();
  };

  render() {
    let presentationButton = <button onClick={this.launchPresentation}>Launch</button>;
    if (this.state.presentationActive) {
      presentationButton = <button>Stop</button>;
    }

    return (
      <div className="header-right-container">
        {presentationButton}
      </div>
    );
  }
}
