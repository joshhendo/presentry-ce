import * as React from 'react';
import './Footer.scss';

export default class Footer extends React.Component<any, any> {
  onClicked = () => {
    alert('hello there');
  };

  render() {
    return (
      <div className="footer-container">
        Footer
        <button onClick={this.onClicked}>Click me!</button>
      </div>
    );
  }
}
