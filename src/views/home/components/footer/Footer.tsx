import * as React from 'react';
import './Footer.scss';
import * as commander from '../../../../presenter/commander';
import * as Konva from 'konva';
import { KonvaCommand } from '../../../../interop/KonvaCommand';
import { loadFile } from '../../../../components/presentations/file-reader';

/*
  x: 20,
  y: 60,
  text: 'COMPLEX TEXT\n\nAll the world\'s a stage, and all the men and women merely players. They have their exits and their entrances.',
  fontSize: 18,
  fontFamily: 'Calibri',
  fill: '#555',
  width: 300,
  padding: 20,
  align: 'center'
 */

export default class Footer extends React.Component<any, any> {
  onClicked = () => {
    /*const file = loadFile();

    const command: KonvaCommand = {
      type: 'text',
      id: 'asdfasfasdf',
      action: 'create',
      data: {
        x: 20,
        y: 60,
        text: file.presentations[0].data.lyrics[0].slides.join('\n'),
        fontSize: 130,
        fontFamily: 'Calibri',
        fill: '#555',
        width: commander.width(),
        padding: 20,
        align: 'center',
        id: 'simple-text',
      },
    };

    commander.sendCommand(command);*/

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
    /*const file = loadFile();

    const command: KonvaCommand = {
      type: 'tween',
      id: 'simple-text',
      action: 'create',
      data: {
        duration: 0.2,
        opacity: 0,
      },
    };

    commander.sendCommand(command);

    const command2: KonvaCommand = {
      type: 'text',
      id: 'asdfasfasdf',
      action: 'create',
      data: {
        x: 20,
        y: 60,
        text: file.presentations[0].data.lyrics[1].slides.join('\n'),
        fontSize: 130,
        fontFamily: 'Calibri',
        fill: '#555',
        width: commander.width(),
        padding: 20,
        align: 'center',
        id: 'simple-text-2',
        opacity: 0,
      },
    };

    commander.sendCommand(command2);

    const command3: KonvaCommand = {
      type: 'tween',
      id: 'simple-text-2',
      action: 'create',
      data: {
        duration: 0.2,
        opacity: 1,
      },
    };

    commander.sendCommand(command3);*/

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
      </div>
    );
  }
}
