import WorkAreaCanvasRight from '../../../../views/home/components/work-area/WorkAreaCanvasRight';
const FluxContainerCreate = require('flux-container-create');
import PresentationStore from '../../../../data/PresentationStore';
import PresentationActions from '../../../../data/PresentationActions';
import { Container } from 'flux/utils';

import * as React from 'react';
import { OrderedMap } from 'immutable';

class WorkAreaCanvasRightContainer extends React.Component<any, any> {
  static getStores() {
    return [PresentationStore];
  }

  static calculateState(prevState: any) {
    const presentations = PresentationStore.getState() as OrderedMap<any, any>;
    const active = presentations.findLast(x => x.current) || null;

    return {
      presentation: active,
      onSetCurrentSlide: PresentationActions.setCurrentSlide,
    };
  }

  render() {
    return <WorkAreaCanvasRight
      presentation={this.state.presentation}
      onSetCurrentSlide={this.state.onSetCurrentSlide}
    />;
  }
}

export default FluxContainerCreate(WorkAreaCanvasRightContainer);
