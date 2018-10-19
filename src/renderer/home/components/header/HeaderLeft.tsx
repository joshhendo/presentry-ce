import * as React from 'react';

import './HeaderLeft.scss';
import { loadFile } from "../../../../components/presentations/file-reader";
import { setLoadedPresentation } from "../../../../components/presentations/manager";

export default class HeaderLeft extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  loadFile = () => {
    const file = loadFile();
    setLoadedPresentation(file);
  };

  render() {
    return <div className="header-left-container">
      <button onClick={this.loadFile}>Load Presentation</button>
    </div>;
  }
}
