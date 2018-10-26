import * as React from 'react';
import './Footer.scss';
import * as commander from '../../../../interop/PresentationCommander';
import { KonvaCommand } from '../../../../interop/KonvaCommand';

export default class Footer extends React.Component<any, any> {
  onClicked = () => {};

  onClicked2 = () => {
    commander.deleteLayer('mylayer');
  };

  showVideo = () => {
    commander.sendVideo();
  };

  render() {
    return (
      <div className="footer-container">
        Footer
        <button onClick={this.onClicked}>Click me!</button>
        <button onClick={this.onClicked2}>Click me 2</button>
        <button onClick={this.showVideo}>Show Video</button>
        <button onClick={() => commander.sendScale()}>Send Scale</button>
        <button onClick={() => commander.sendRect()}>Send Rectangle</button>
        <button onClick={() => commander.sendRedraw()}>Send Redraw</button>
      </div>
    );
  }
}
