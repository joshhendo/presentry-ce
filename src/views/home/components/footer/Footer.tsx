import * as React from 'react';
import './Footer.scss';
import * as commander from '../../../../interop/PresentationCommander';
import { KonvaCommand } from '../../../../interop/KonvaCommand';

export default class Footer extends React.Component<any, any> {
  onClicked = () => {
    commander.createLayer('mylayer');

    const command: KonvaCommand = {
      type: 'text',
      id: 'mylayer',
      action: 'create',
      data: {
        x: 20,
        y: 60,
        text: 'asdfasdflasdjkflasdjlaskdflajadfslfkj',
        fontSize: 130,
        fontFamily: 'Calibri',
        fill: '#555',
        width: commander.width(),
        padding: 20,
        align: 'center',
        id: 'simple-text',
      },
    };

    commander.sendCommand(command);
  };

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
