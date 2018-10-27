import * as React from 'react';
import './Footer.scss';
import * as commander from '../../../../interop/PresentationCommander';
import { KonvaCommand } from '../../../../interop/KonvaCommand';
import * as Konva from 'konva';

export default class Footer extends React.Component<any, any> {
  onClicked = () => {
    const txt = new Konva.Text({
      x: 20,
      y: 60,
      text:
        "COMPLEX TEXT\n\nAll the world's a stage,\n\n\nand all the men and women merely players. They have their exits and their entrancesasdfasdfasdfasdfasfasdfasdfasdfasfasdfasdfasdfasdfasdfasdasdf.",
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      width: 300,
      padding: 20,
      align: 'center',
    });

    alert(txt.getTextWidth());
    alert(txt.getHeight());
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
