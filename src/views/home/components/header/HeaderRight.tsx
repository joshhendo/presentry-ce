import * as React from 'react';

import './HeaderRight.scss';
import * as commander from '../../../../interop/PresentationCommander';

export interface StateProps {
  isActive: boolean;
}

export interface DispatchProps {
  onToggleActive: () => void;
}

export type Props = StateProps & DispatchProps;

export default class HeaderRight extends React.Component<Props, any> {
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
    });
  }

  render() {
    let presentationButton = (
      <button
        onClick={this.props.onToggleActive}
        className="btn btn-primary header-right-button">
        Launch
      </button>
    );
    if (this.props.isActive) {
      presentationButton = (
        <button
          onClick={this.props.onToggleActive}
          className="btn btn-primary header-right-button">
          Stop
        </button>
      );
    }

    const blackButton = (
      <button className="btn btn-outline-secondary header-right-button">
        Go To Black
      </button>
    );

    return (
      <div className="header-right-container">
        {blackButton}
        {presentationButton}
      </div>
    );
  }
}
