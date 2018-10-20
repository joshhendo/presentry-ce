import * as React from 'react';

import './HeaderLeft.scss';
import { loadFile } from '../../../../components/presentations/file-reader';

import PresentationActions from '../../../../data/internal/presentation/PresentationActions';

export default class HeaderLeft extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  loadFile = () => {
    const file = loadFile();

    for (const presentation of file.presentations) {
      PresentationActions.addPresentation(presentation);
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
