import WorkAreaCanvasLeft from '../../../../views/home/components/work-area/WorkAreaCanvasLeft';
// import {Container} from 'flux/utils';
const FluxContainerCreate = require('flux-container-create');
import PresentationStore from '../../../../data/PresentationStore';
import PresentationActions from '../../../../data/PresentationActions';

import * as React from 'react';

class WorkAreaCanvasLeftContainer extends React.Component<any, any> {
  static getStores() {
    return [PresentationStore];
  }

  static calculateState(prevState: any) {
    return {
      presentations: PresentationStore.getState(),
      onDeletePresentation: PresentationActions.deletePresentation,
      onSetCurrent: PresentationActions.setCurrent,
    }
  }

  render() {
    return <WorkAreaCanvasLeft
      presentations={this.state.presentations}
      onDeletePresentation={this.state.onDeletePresentation}
      onSetCurrent={this.state.onSetCurrent}
    />
  }
}

export default FluxContainerCreate(WorkAreaCanvasLeftContainer);

