import WorkAreaCanvasLeft from '../../../../views/home/components/work-area/WorkAreaCanvasLeft';
const FluxContainerCreate = require('flux-container-create');
import PresentationStore from '../../../../data/internal/presentation/PresentationStore';
import PresentationActions from '../../../../data/internal/presentation/PresentationActions';

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
    };
  }

  render() {
    return (
      <WorkAreaCanvasLeft
        presentations={this.state.presentations}
        onDeletePresentation={this.state.onDeletePresentation}
        onSetCurrent={this.state.onSetCurrent}
      />
    );
  }
}

export default FluxContainerCreate(WorkAreaCanvasLeftContainer);
