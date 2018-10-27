import * as React from 'react';
import Menu from '../menu/Menu';

import './Settings.scss';

export default class Settings extends React.Component<any, any> {
  render() {
    return (
      <div>
        <main id="page-wrap">
          <div className="settings-container">
            <h1>Settings</h1>
          </div>
        </main>
      </div>
    );
  }
}
