import * as React from 'react';

import './HeaderLeft.scss';
import { loadFile } from '../../../../components/presentations/file-reader';

import * as PresentationActions from '../../../../data/internal/Actions';

export default class HeaderLeft extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  loadFile = () => {
    const file = loadFile();

    for (const section of file.sections) {
      PresentationActions.addSection(section);
    }
  };

  render() {
    return (
      <div className="header-left-container">
        <button onClick={this.loadFile}>Load Presentation</button>
      </div>
    );
  }
}
