import * as React from 'react';
import HeaderRight from './HeaderRight';
import HeaderMiddle from './HeaderMiddle';
import HeaderLeft from './HeaderLeft';

import './Header.scss';

export default class Header extends React.Component<any, any> {
  render() {
    return (
      <div className="header-container">
        <HeaderLeft />
        <HeaderMiddle />
        <HeaderRight />
      </div>
    );
  }
}
